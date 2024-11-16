import path from "path";
import { User } from "./entities/User";
import { OpcoesResposta } from "./entities/OpcoesResposta";
import { Pergunta } from "./entities/Pergunta";
import { Questionario } from "./entities/Questionario";
import { Resposta } from "./entities/Resposta";
import { ConnectionOptions } from "typeorm";

export default 
  {
    type: "postgres",
    database: "lireddit2",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User, Questionario, Pergunta, Resposta, OpcoesResposta],
  } as ConnectionOptions

