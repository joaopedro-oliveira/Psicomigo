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
  await conn.runMigrations();
  // __prod__ ? await conn.runMigrations() : null;

  const app = express();
  const httpServer = http.createServer(app);
  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  app.set("proxy", 1);
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
};

main().catch((err) => {
  console.error(err);
});
