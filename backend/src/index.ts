import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import session from "express-session";
import cors from "cors";
import "dotenv-safe/config";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import path from "path";
import { RedisPubSub } from "graphql-redis-subscriptions";
import http from "http";
import { Questionario } from "./entities/Questionario";
import { Pergunta } from "./entities/Pergunta";
import { Resposta } from "./entities/Resposta";
import { OpcoesResposta } from "./entities/OpcoesResposta";
import { PerguntaResolver } from "./resolvers/perguntas";
import { QuestionarioResolver } from "./resolvers/questionario";
import { RespostaResolver } from "./resolvers/respostas";
import { useServer } from "graphql-ws/lib/use/ws";
import { Server as WebSocketServer } from "ws";
import { __prod__, COOKIE_NAME } from "./constants/constants";
import { NotificationResolver } from "./resolvers/notification";
import RedisIoRedis from "ioredis";
import cron from "node-cron";

const pubsub = new RedisPubSub({
  publisher: new RedisIoRedis(process.env.REDIS_URL, {
    retryStrategy: (times) => Math.max(times * 100, 3000),
  }),
  subscriber: new Redis(process.env.REDIS_URL, {
    retryStrategy: (times) => Math.max(times * 100, 3000),
  }),
});

const schema = buildSchema({
  resolvers: [
    PerguntaResolver,
    QuestionarioResolver,
    UserResolver,
    RespostaResolver,
    NotificationResolver,
  ],
  validate: false,
  pubSub: pubsub,
});

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL!,
    logging: true,
    synchronize: !__prod__,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User, Questionario, Pergunta, Resposta, OpcoesResposta],
  });

  await conn.showMigrations();
  // await conn.runMigrations();
  // __prod__ ? await conn.runMigrations() : null;

  const app = express();
  app.set("proxy", 1);
  const httpServer = http.createServer(app);
  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  app.use(
    cors(
      __prod__
        ? {
            origin: process.env.CORS_ORIGIN,
            credentials: true,
            optionsSuccessStatus: 204,
          }
        : {
            origin: (origin, callback) => {
              if (process.env.ALLOWED_ORIGINS.includes(origin!) || !origin) {
                callback(null, true);
              } else {
                callback(new Error("Not allowed by CORS"));
              }
            },
            credentials: true,
            optionsSuccessStatus: 204,
          }
    )
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTTL: true,
        disableTouch: false,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        // secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );
  const apolloServer = new ApolloServer({
    schema: await schema,
    playground: true,
    context: ({ req, res }) => ({ req, res, redis }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app: app as any,
    cors: false,
  });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  useServer(
    {
      schema: await schema,
      onConnect: () => console.info("Cliente conectado para assinaturas"),
      onDisconnect: () => console.info("Cliente desconectado de assinaturas"),
      onError: (err) => {
        console.error("WebSocket erro", err);
      },
    },
    wsServer
  );

  httpServer.listen(parseInt(process.env.PORT), () => {
    console.log(`Servidor pronto em http://localhost:${process.env.PORT}`);
    console.log(
      `Assinaturas prontas em ws://localhost:4000${apolloServer.subscriptionsPath}`
    );
  });

  // Explicação da função cron
  // Primeiro numero é o minuto
  // Segundo numero é a hora
  // Terceiro numero é o dia do mês, caso for * pode ser qualquer dia do mês
  // Quarto numero é o mês, caso for * todo mês
  // Quinto numero é o dia da semana, que pode ser um range, exemplo 1-5 para segunda a sexta

  const timeString = !__prod__ ? "0 * * * *" : "0 0 * * 1-5";

  // Chamada diaria, todo dia as 00:00 para criar um questionário, caso for produção

  cron.schedule(timeString, async () => {
    console.log(
      "Criando questionarios diarios.. Data: ",

      new Date().toLocaleTimeString()
    );
    try {
      const q = new QuestionarioResolver();
      await q.criarQuestionarioServidor((payload) =>
        //  console.log(payload)
        pubsub.publish("NOVO_QUESTIONARIO", payload)
      );
      // console.log("Daily task completed:", questionarios);
    } catch (error) {
      console.error("Error executing daily task:", error);
    }
  });
  // // TESTE, COMENTAR DEPOIS POR FAVOR
  // cron.schedule("*/10 * * * *", async () => {
  //   console.log("Enviando lembretes a cada 15 min para teste");
  //   try {
  //     const n = new NotificationResolver();

  //     await n.enviarLembretes((payload) =>
  //       pubsub.publish("NOVA_NOTIFICACAO", payload)
  //     );
  //     // console.log("Daily task completed:", questionarios);
  //   } catch (error) {
  //     console.error("Error executing daily task:", error);
  //   }
  // });

  cron.schedule("0 12 * * *", async () => {
    console.log("Enviando lembretes das 12 horas");
    try {
      const n = new NotificationResolver();

      await n.enviarLembretes((payload) =>
        pubsub.publish("NOVA_NOTIFICACAO", payload)
      );
      // console.log("Daily task completed:", questionarios);
    } catch (error) {
      console.error("Error executing daily task:", error);
    }
  });

  cron.schedule("0 15 * * *", async () => {
    console.log("Enviando lembrestes das 15 horas");
    try {
      const n = new NotificationResolver();

      await n.enviarLembretes((payload) =>
        pubsub.publish("NOVA_NOTIFICACAO", payload)
      );
      // console.log("Daily task completed:", questionarios);
    } catch (error) {
      console.error("Error executing daily task:", error);
    }
  });

  cron.schedule("0 20 * * *", async () => {
    console.log("Enviando lembretes das 12 horas");
    try {
      const n = new NotificationResolver();

      await n.enviarLembretes((payload) =>
        pubsub.publish("NOVA_NOTIFICACAO", payload)
      );
      // console.log("Daily task completed:", questionarios);
    } catch (error) {
      console.error("Error executing daily task:", error);
    }
  });

  // Chamada semanal, todo sabado as 07:00 para enviar o relatório dos questionários.
  cron.schedule("0 7 * * 6", async () => {
    console.log(
      "Enviando relatório semanal.. Data: ",
      new Date().toLocaleDateString()
    );

    const q = new QuestionarioResolver();
    await q.enviarRelatorios();
  });
};

main().catch((err) => {
  console.error(err);
});
