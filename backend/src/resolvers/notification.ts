import { Questionario } from "../entities/Questionario";
import { MyContext } from "../types";
import {
  Resolver,
  Query,
  Arg,
  Ctx,
  Mutation,
  Field,
  ObjectType,
  Subscription,
  Root,
  InputType,
  PubSub,
  Publisher,
  Int,
} from "type-graphql";
import { MoreThan } from "typeorm";

@ObjectType()
@ObjectType()
class DataObject {
  @Field(() => String)
  key: string;

  @Field(() => String)
  value: string;
}

@ObjectType()
export class Notificacao {
  @Field(() => String)
  sound: string;
  @Field(() => String)
  title: string;
  @Field(() => String)
  body: string;
  @Field(() => DataObject, { nullable: true })
  data: DataObject;
  @Field(() => [Int])
  userIds: number[];
}

@Resolver()
export class NotificationResolver {
  @Subscription(() => Notificacao, {
    topics: "NOVA_NOTIFICACAO",
  })
  enviaNotificacao(@Root() notificacao: Notificacao): Notificacao {
    return notificacao;
  }

  @Mutation(() => Boolean)
  async enviarLembretes(pubSub: Publisher<Notificacao>): Promise<boolean> {
    const data = new Date();
    data.setHours(data.getHours() - 24);
    const questionarios = await Questionario.find({
      relations: ["respostas"],
      where: {
        createdAt: MoreThan(data),
        respondido: false,
      },
      order: { createdAt: "DESC" },
    });

    const usersId: number[] = [];

    for (const questionario of questionarios) {
      await usersId.push(questionario.usuarioId);
    }

    const notificacao: Notificacao = {
      sound: "default",
      title: "Lembrete",
      body: "Não se esqueça de responder as perguntinhas!",
      data: {
        key: "tarefa",
        value: "index",
      },
      userIds: usersId,
    };

    await pubSub(notificacao);
    return true;
  }

  @Mutation(() => Boolean)
  async enviarLembretesDebug(
    @PubSub("NOVA_NOTIFICACAO") pubSub: Publisher<Notificacao>
  ): Promise<boolean> {
    const data = new Date();
    data.setHours(data.getHours() - 24);
    const questionarios = await Questionario.find({
      relations: ["respostas"],
      where: {
        createdAt: MoreThan(data),
        respondido: false,
      },
      order: { createdAt: "DESC" },
    });

    const usersId: number[] = [];

    for (const questionario of questionarios) {
      await usersId.push(questionario.usuarioId);
    }

    const notificacao: Notificacao = {
      sound: "default",
      title: "Lembrete",
      body: "Não se esqueça de responder as perguntinhas!",
      data: {
        key: "tarefa",
        value: "index",
      },
      userIds: usersId,
    };

    await pubSub(notificacao);
    return true;
  }
}
