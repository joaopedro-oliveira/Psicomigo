import { Opcoes } from "../resolvers/user";

export const validateRegister = (options: Opcoes) => {
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Email inválido.",
      },
    ];
  }
  if (options.username.length <= 3) {
    return [
      {
        field: "username",
        message: "Nome precisa ser maior do que 3 caracteres.",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "Nome não pode incluir '@' .",
      },
    ];
  }

  if (options.password.length <= 3) {
    return [
      {
        field: "password",
        message: "Senha precisa ser maior do que 3 caracteres.",
      },
    ];
  }

  if (options.password != options.confirmarSenha) {
    return [
      {
        field: "confirmarSenha",
        message: "Senhas estão diferentes",
      },
    ];
  }

  if (options.cpf.length != 14) {
    return [
      {
        field: "cpf",
        message: "CPF inválido",
      },
    ];
  }

  if (options.crm.length <= 6 && options.tipo == "Doutor") {
    return [
      {
        field: "crm",
        message: "CRM inválido",
      },
    ];
  }

  if (options.tipo.length == 0) {
    return [
      {
        field: "tipo",
        message: "Tipo inválido",
      },
    ];
  }

  if (options.genero.length == 0) {
    return [
      {
        field: "genero",
        message: "Gênero inválido",
      },
    ];
  }

  return null;
};
