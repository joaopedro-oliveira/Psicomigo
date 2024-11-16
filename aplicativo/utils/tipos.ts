import { InputMaybe } from "@/generated/graphql";

export interface Opcoes_Registro {
  email: string;
  username: string;
  password: string;
  confirmarSenha: string;
  cpf: string;
  crm: string;
  tipo: string;
  genero: string;
  dataNascimento: Date | undefined;
}

interface OpcoesRespostaInput {
  id?: number;
  text: string;
}

export interface PerguntaInput {
  pergunta: string;
  tipo: string;
  topico: string;
  opcoes_respostas: InputMaybe<OpcoesRespostaInput[] | undefined>;
  perguntaAtiva: boolean;
}
