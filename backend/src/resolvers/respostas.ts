import { OpcoesResposta, PerguntaResposta } from "src/types";
import { OpcoesRespostaInterface, Resposta } from "../entities/Resposta";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  InputType,
  Int,
  PubSub,
  Publisher,
} from "type-graphql";
import { Questionario } from "../entities/Questionario";
import { Pergunta } from "../entities/Pergunta";
import { Notificacao } from "./notification";

@InputType()
export class OpcoesRespostaInputRe {
  @Field(() => Int, { nullable: true })
  id: number;
  @Field(() => String, { nullable: true })
  text: string;
}

@InputType()
export class RespostaInput {
  @Field(() => Int)
  respostaId: number;
  @Field(() => String, { nullable: true })
  respostaLivre: string;
  @Field(() => [OpcoesRespostaInputRe], { nullable: true })
  opcaoResposta: OpcoesRespostaInputRe[];
}

@Resolver(Resposta)
export class RespostaResolver {
  @Query(() => String)
  helloResposta() {
    return "hello world";
  }

  @Mutation(() => Boolean)
  async responderPergunta(
    @PubSub("NOVA_NOTIFICACAO") pubSub: Publisher<Notificacao>,
    @Arg("input") input: RespostaInput
  ): Promise<Boolean> {
    const resposta = await Resposta.findOneOrFail(input.respostaId, {
      relations: ["questionario", "questionario.respostas"],
    });
    if (!resposta) {
      return false;
    }

    if (
      input.respostaLivre === null &&
      (!input.opcaoResposta || input.opcaoResposta.length === 0)
    ) {
      return false;
    }

    if (resposta.tipo == "resposta livre") {
      resposta.resposta_livre = input.respostaLivre;
    } else {
      if (input.opcaoResposta) {
        resposta.opcao_resposta_escolhida = input.opcaoResposta;
      }
    }

    resposta.respondido = true;
    resposta.dataResposta = new Date();

    await resposta.save();

    const questionario = await Questionario.findOneOrFail({
      where: { id: resposta.questionario.id },
      relations: ["respostas"],
    });

    const numeroPerguntas: number = questionario.respostas.length;
    let numeroPerguntasRespondidas: number = 0;

    for (const resposta of questionario.respostas) {
      if (resposta.respondido) {
        numeroPerguntasRespondidas += 1;
      }
    }

    if (numeroPerguntas === numeroPerguntasRespondidas) {
      questionario.respondido = true;
      questionario.dataFinalizacao = new Date();
      pubSub({
        sound: "default",
        title: "Questionário respondido!",
        body: "Clique na notificação para ver as suas respostas!",
        data: { key: "nagivate", value: "history" },
        userIds: [questionario.usuarioId],
      });
      await questionario.save();
    }

    return true;
  }
}
