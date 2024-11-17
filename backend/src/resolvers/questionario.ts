import { MyContext } from "src/types";
import { Questionario } from "../entities/Questionario";
import {
  Resolver,
  Query,
  Mutation,
  Ctx,
  Subscription,
  Root,
  Publisher,
  PubSub,
  ObjectType,
  Field,
  Int,
} from "type-graphql";
import { UserResolver } from "./user";
import { PerguntaResolver } from "./perguntas";
import { getConnection, getRepository, MoreThan } from "typeorm";
import { Pergunta } from "../entities/Pergunta";
import { Resposta } from "../entities/Resposta";
import { User } from "../entities/User";
import { sendEmail } from "../utils/sendEmail";

@ObjectType()
class Paciente {
  @Field(() => Int)
  id!: number;

  @Field()
  username!: string;

  @Field()
  cpf!: string;
}

@ObjectType()
class Medico {
  @Field(() => Int)
  id!: number;

  @Field()
  username!: string;

  @Field()
  email!: string;
}

@ObjectType()
export class QuestionarioOutput {
  @Field(() => Int)
  id!: number;

  @Field(() => Int)
  usuarioId!: number;

  @Field(() => [Resposta])
  respostas!: Resposta[];

  @Field()
  respondido!: boolean;

  @Field(() => Int)
  peso!: number;

  @Field(() => Date, { nullable: true })
  dataFinalizacao?: Date;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;

  @Field(() => Paciente)
  paciente!: Paciente;

  @Field(() => Medico)
  medico!: Medico;
}

@Resolver(Questionario)
export class QuestionarioResolver {
  @Query(() => [Questionario])
  async questionarios(@Ctx() { req }: MyContext): Promise<Questionario[]> {
    return await Questionario.find({
      relations: ["respostas"],
      where: {
        usuarioId: req.session.userId,
      },
      order: { createdAt: "DESC" },
    });
  }

  @Query(() => Questionario, { nullable: true })
  async questionario(
    @Ctx() { req }: MyContext
  ): Promise<Questionario | undefined> {
    if (!req.session.userId) {
      return undefined;
    }

    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const questionario = await Questionario.findOne({
      relations: ["respostas"],
      where: {
        usuarioId: req.session.userId,
        createdAt: MoreThan(twentyFourHoursAgo),
      },
      order: { createdAt: "DESC" },
    });

    if (questionario && questionario.respostas) {
      questionario.respostas = questionario.respostas.sort((a, b) => {
        const dateA =
          a.updatedAt instanceof Date ? a.updatedAt : new Date(a.updatedAt);
        const dateB =
          b.updatedAt instanceof Date ? b.updatedAt : new Date(b.updatedAt);

        if (a.respondido === b.respondido) {
          return dateA.getTime() - dateB.getTime();
        }
        return a.respondido === true ? -1 : 1;
      });
      return questionario;
    } else {
      return undefined;
    }
  }

  @Subscription(() => Questionario, {
    topics: "NOVO_QUESTIONARIO",
  })
  enviaQuestionario(@Root() questionario: Questionario): Questionario {
    return questionario;
  }

  @Mutation(() => [Questionario])
  async criarQuestionario(
    @PubSub("NOVO_QUESTIONARIO") pubSub: Publisher<Questionario>
  ): Promise<Questionario[]> {
    const perguntasResolver = new PerguntaResolver();
    const pacientes = await new UserResolver().pacientes();
    let questionarios: Questionario[] = [];

    const quantidadePerguntasPorTopico = 4;

    for (const paciente of pacientes) {
      if (!paciente.paciente_ativo) continue;

      const perguntasDoPaciente = await perguntasResolver.perguntasJob(
        paciente.topicosPaciente
      );

      if (perguntasDoPaciente.length === 0) continue;
      const perguntasByTopico: Record<string, Pergunta[]> = {};

      for (const pergunta of perguntasDoPaciente) {
        if (!perguntasByTopico[pergunta.topico]) {
          perguntasByTopico[pergunta.topico] = [];
        }
        perguntasByTopico[pergunta.topico].push(pergunta);
      }
      const perguntasSelecionadas: Pergunta[] = [];

      for (const topico in perguntasByTopico) {
        const perguntas = perguntasByTopico[topico];
        const shuffledPerguntas = perguntas.sort(() => 0.5 - Math.random());
        const quantidade = Math.min(
          quantidadePerguntasPorTopico,
          shuffledPerguntas.length
        );
        const selected = shuffledPerguntas.slice(0, quantidade);

        perguntasSelecionadas.push(...selected);
      }

      const quesitonario_ = await Questionario.create({
        usuarioId: paciente.id,
      }).save();

      let perguntasIds: number[] = [];

      for (const pergunta of perguntasSelecionadas) {
        const op = await Promise.all(
          pergunta.opcoes_respostas.map(async (opcao) => {
            return {
              id: opcao.id,
              text: opcao.text,
            };
          })
        );

        const result = await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Resposta)
          .values({
            questionario: quesitonario_,
            pergunta: pergunta.pergunta,
            tipo: pergunta.tipo,
            pergunta_id: pergunta.id,
            opcao_resposta: [...op],
          })
          .returning("*")
          .execute();

        perguntasIds.push(result.raw[0].id);
      }

      const questionario = await Questionario.findOneOrFail({
        where: {
          id: quesitonario_.id,
        },
        relations: ["respostas"],
      });

      await pubSub(questionario);
      questionarios.push(questionario);
    }

    return questionarios;
  }

  @Mutation(() => [QuestionarioOutput])
  async enviarRelatorios() {
    const data = new Date();
    data.setHours(data.getHours() - 24 * 7);

    const questionarios = await getRepository(Questionario)
      .createQueryBuilder("q")
      .leftJoinAndSelect("q.respostas", "respostas")
      .innerJoinAndMapOne("q.paciente", User, "p", "p.id = q.usuarioId")
      .innerJoinAndMapOne("q.medico", User, "m", "m.id = p.medicoId")
      .select([
        "q.id",
        "q.usuarioId",
        "respostas",
        "q.respondido",
        "q.peso",
        "q.dataFinalizacao",
        "q.createdAt",
        "q.updatedAt",
        "p.id",
        "p.username",
        "p.cpf",
        "m.id",
        "m.username",
        "m.email",
      ])
      .orderBy("q.createdAt", "DESC")
      .getMany();

    const questionarios_ = questionarios as unknown as QuestionarioOutput[];

    let email: {
      html: string;
      para: string;
    }[] = [];

    for (const questionario of questionarios_) {
      let html: string = `
      <h2 style="margin-top: 25px"> Questionário: ${
        questionario.id
      } - Paciente: ${questionario.paciente.username} </h2>
      <h3>Data de conclusão: ${
        questionario.respondido
          ? new Date(questionario.dataFinalizacao!).toLocaleDateString()
          : "Não concluído "
      } </h3>
      <table border="1" style="border-collapse: collapse; width: 100%; margin-bottom: 12px">
      <thead>
        <tr>
          <th>Pergunta</th>
          <th>Resposta</th>
          <th>Data resposta</th>
        </tr>
      </thead>
      <tbody>`;
      for (const resposta of questionario.respostas) {
        html += `<tr>
        <td>${resposta.pergunta}</td>
        <td>${
          resposta.tipo === "resposta livre"
            ? !resposta.resposta_livre
              ? "Não respondido"
              : resposta.resposta_livre
            : resposta.opcao_resposta_escolhida
            ? resposta.opcao_resposta_escolhida
                .map((opcao) => opcao.text)
                .join(", ")
            : "Não respondido"
        }</td>
        <td>${
          new Date(resposta.dataResposta).toLocaleDateString() === "31/12/1969"
            ? "Não respondido"
            : new Date(resposta.dataResposta).toLocaleDateString()
        }</td>
      </tr>`;
      }
      html += `
      </tbody>
    </table>
    
  `;
      email.push({
        html,
        para: questionario.medico.email,
      });
    }

    const emailsCombinados = email.reduce((acc, curr) => {
      if (acc[curr.para]) {
        acc[curr.para].html += curr.html;
      } else {
        acc[curr.para] = { html: curr.html, para: curr.para };
      }
      return acc;
    }, {} as { [key: string]: { html: string; para: string } });

    const emailsCombinadosArray = Object.values(emailsCombinados);
    for (const email of emailsCombinadosArray) {
      sendEmail(
        email.para,
        `<h2>Relatorio das datas: de ${new Date(
          new Date().setHours(new Date().getHours() - 24 * 7)
        ).toLocaleDateString()} até ${new Date().toLocaleDateString()}</h2>` +
          email.html,
        `Relatório de questionários - ${new Date().toLocaleDateString()}`
      );
    }

    return questionarios;
  }
}
