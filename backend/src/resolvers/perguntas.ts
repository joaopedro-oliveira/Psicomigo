import { MyContext } from "src/types";
import { Pergunta } from "../entities/Pergunta";
import {
  Resolver,
  Query,
  Ctx,
  Arg,
  InputType,
  Field,
  Mutation,
  UseMiddleware,
  Int,
} from "type-graphql";
import { OpcoesResposta } from "../entities/OpcoesResposta";
import { isAuth } from "../middleware/isAuth";

@InputType()
class OpcoesRespostaInput {
  @Field()
  text!: string;
  @Field({ nullable: true })
  id?: number;
}

@InputType()
class PerguntaInput {
  @Field()
  pergunta!: string;

  @Field()
  tipo!: string;

  @Field(() => String)
  topico!: string;

  @Field(() => [OpcoesRespostaInput], { nullable: true })
  opcoes_respostas: OpcoesRespostaInput[] | undefined;

  @Field()
  perguntaAtiva!: boolean;
}

@Resolver(Pergunta)
export class PerguntaResolver {
  @Query(() => [Pergunta], { nullable: true })
  async perguntasJob(
    @Arg("topicos", () => [String], { nullable: true })
    topicos: string[] | undefined
  ): Promise<Pergunta[]> {
    if (!topicos) {
      return await Pergunta.find({
        relations: ["opcoes_respostas"],
        where: { perguntaAtiva: true },
      });
    }

    const perguntas = await Pergunta.createQueryBuilder("pergunta")
      .leftJoinAndSelect("pergunta.opcoes_respostas", "opcoes_respostas")
      .where("pergunta.perguntaAtiva = :perguntaAtiva", { perguntaAtiva: true })
      .andWhere("pergunta.topico IN (:...topicos)", { topicos })
      .getMany();

    return perguntas;
  }

  @Query(() => [Pergunta], { nullable: true })
  async perguntas(@Ctx() { req }: MyContext): Promise<Pergunta[]> {
    return await Pergunta.find({
      relations: ["opcoes_respostas"],
      where: { creatorId: req.session.userId },
    });
  }

  @Query(() => Pergunta, { nullable: true })
  async pergunta(
    @Arg("perguntaId", () => Int)
    perguntaId: number,
    @Ctx() { req }: MyContext
  ): Promise<Pergunta | undefined> {
    return await Pergunta.findOne({
      relations: ["opcoes_respostas"],
      where: { id: perguntaId, creatorId: req.session.userId },
    });
  }

  @Mutation(() => Pergunta)
  @UseMiddleware(isAuth)
  async criarPergunta(
    @Arg("input") input: PerguntaInput,
    @Ctx() { req }: MyContext
  ): Promise<Pergunta> {
    const pergunta = await Pergunta.create({
      pergunta: input.pergunta,
      tipo: input.tipo,
      topico: input.topico,
      perguntaAtiva: input.perguntaAtiva,
      creatorId: req.session.userId,
    }).save();

    if (input.opcoes_respostas && input.opcoes_respostas.length > 0) {
      for (const opcao of input.opcoes_respostas) {
        const opcoesResposta = OpcoesResposta.create({
          text: opcao.text,
          pergunta: pergunta,
        });
        await opcoesResposta.save();
      }
    }
    return Pergunta.findOneOrFail(pergunta.id, {
      relations: ["opcoes_respostas"],
    });
  }

  @Mutation(() => Pergunta, { nullable: true })
  @UseMiddleware(isAuth)
  async atualizarPergunta(
    @Arg("input") input: PerguntaInput,
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<Pergunta | null> {
    const pergunta = await Pergunta.findOne(id, {
      relations: ["opcoes_respostas"],
      where: { creatorId: req.session.userId },
    });
    if (!pergunta) return null;

    pergunta.tipo = input.tipo;

    if (input.opcoes_respostas) {
      const inputOptionIds = input.opcoes_respostas.map((option) => option.id);

      pergunta.opcoes_respostas = pergunta.opcoes_respostas.filter(
        (existingOption) => {
          const matchingInputOption = input.opcoes_respostas?.find(
            (opt) => opt.id === existingOption.id
          );

          if (matchingInputOption) {
            existingOption.text = matchingInputOption.text;
            return true;
          } else {
            existingOption.remove();
            return false;
          }
        }
      );

      const newOptions = input.opcoes_respostas.filter(
        (option) => !option.id || !inputOptionIds.includes(option.id)
      );
      for (const optionData of newOptions) {
        const newOption = await OpcoesResposta.create({
          text: optionData.text,
          pergunta,
        }).save();
        pergunta.opcoes_respostas.push(newOption);
      }
    }

    await pergunta.save();

    return pergunta;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletarPergunta(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await Pergunta.delete({ id, creatorId: req.session.userId });
    return true;
  }
}
