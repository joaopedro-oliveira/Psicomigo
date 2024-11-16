import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";
import { User } from "./entities/User";
import { Stream } from "stream";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  res: Response;
  redis: Redis;
};

export type OpcoesResposta = {
  id: number;
  text: string;
};

export type PerguntaResposta = {
  questionarioId: number;
  respondido: boolean;
  resposta?: {
    id: number;
    pergunta: string;
    pergunta_id: number;
    opcoes_respostas: OpcoesResposta[];
    resposta_livre: string;
  };
  responder: boolean;
};
