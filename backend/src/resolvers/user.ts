import { MyContext } from "src/types";
import {
  Resolver,
  Mutation,
  Arg,
  Field,
  Ctx,
  ObjectType,
  Query,
  FieldResolver,
  Root,
  UseMiddleware,
  Int,
  InputType,
  Publisher,
  PubSub,
} from "type-graphql";
import argon2 from "argon2";
import { User } from "../entities/User";
import { validateRegister } from "../utils/validadeRegister";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";
import { FORGET_PASSWORD_PREFIX } from "../constants/constants";
import { getConnection, Like, Not } from "typeorm";
import { isAuth } from "../middleware/isAuth";
import { randomBytes } from "crypto";
import { Notificacao } from "./notification";

@InputType()
export class Opcoes {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  confirmarSenha: string;
  @Field()
  cpf: string;
  @Field()
  crm: string;
  @Field()
  tipo: string;
  @Field()
  dataNascimento: Date;
  @Field()
  genero: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class AdicionarResponse {
  @Field(() => String, { nullable: true })
  erro?: string;

  @Field(() => Boolean)
  sucesso: boolean;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    if (req.session.userId === user.id) {
      return user.email;
    }
    return "";
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length <= 3) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "Password must be bigger than 3 characters",
          },
        ],
      };
    }
    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "Token expired.",
          },
        ],
      };
    }

    const userIdNum = parseInt(userId);
    const user = await User.findOne(userIdNum);

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "Usuário não existe.",
          },
        ],
      };
    }

    await User.update(
      { id: userIdNum },
      {
        password: await argon2.hash(newPassword),
      }
    );
    await redis.del(key);
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return true;
    }
    const token = v4();
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 2
    );

    await sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">Reset Password</a>`,
      "Mudar senha"
    );
    return true;
  }

  @Query(() => [User], { nullable: true })
  async users(): Promise<User[] | undefined> {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    return User.findOne(req.session.userId);
  }

  @Query(() => User, { nullable: true })
  async user(
    @Arg("userId", () => Int) userId: number
  ): Promise<User | undefined> {
    return User.findOne({
      where: {
        id: userId,
      },
    });
  }

  @Query(() => [User], { nullable: true })
  async pacientes(): Promise<User[]> {
    return User.find({ where: { tipo: "Paciente" } });
  }

  @Query(() => [User], { nullable: true })
  async pacientesDoutor(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }

    const currentUser = await User.findOneOrFail(req.session.userId, {
      relations: ["pacientes"],
    });
    return currentUser.pacientes;
  }

  @Query(() => User, { nullable: true })
  async medico(@Ctx() { req }: MyContext): Promise<User | undefined> {
    if (!req.session.userId) {
      return undefined;
    }

    const currentUser = await User.findOne(req.session.userId, {
      relations: ["medico"],
    });
    if (!currentUser) return undefined;
    return currentUser.medico;
  }

  @Mutation(() => AdicionarResponse)
  async adicionarPaciente(
    @Ctx() { req }: MyContext,
    @Arg("userKey", () => String) userKey: string,
    @PubSub("NOVA_NOTIFICACAO") pubSub: Publisher<Notificacao>
  ): Promise<AdicionarResponse> {
    const currentUser = await User.findOne(req.session.userId, {
      relations: ["pacientes"],
    });
    const targetUser = await User.findOne({ where: { userKey } });

    if (!currentUser)
      return {
        erro: "Você não está logado",
        sucesso: false,
      };

    if (!targetUser) {
      return {
        erro: "Este usuário não existe.",
        sucesso: false,
      };
    }

    if (currentUser.pacientes?.includes(targetUser)) {
      return {
        erro: "Este usuário já é seu paciente.",
        sucesso: false,
      };
    }

    await getConnection()
      .createQueryBuilder()
      .relation(User, "pacientes")
      .of(currentUser)
      .add(targetUser);

    const notificação: Notificacao = {
      sound: "default",
      title: "Usuário adicionado",
      body: `Você adicionou um novo paciente, ${targetUser.username}`,
      data: {
        key: "tarefa",
        value: "index",
      },
      userIds: [currentUser.id],
    };

    pubSub(notificação);

    return {
      sucesso: true,
    };
  }
  @UseMiddleware(isAuth)
  @Mutation(() => User)
  async editarPaciente(
    @Arg("userId", () => Int) userId: number,
    @Arg("paciente_ativo", () => Boolean) paciente_ativo: boolean,
    @Arg("topicos", () => [String], { nullable: true })
    topicos: string[] | undefined
  ): Promise<User | undefined> {
    const user = await User.findOne(userId);

    if (!user) return undefined;

    user.paciente_ativo = paciente_ativo;
    if (topicos) user.topicosPaciente = topicos;

    await user.save();
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: Opcoes,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: options.username,
          password: hashedPassword,
          userKey: randomBytes(16).toString("hex"),
          email: options.email,
          cpf: options.cpf,
          crm: options.crm,
          genero: options.genero,
          tipo: options.tipo,
          dataNascimento: options.dataNascimento,
        })
        .returning("*")
        .execute();
      user = result.raw[0];
    } catch (err) {
      if (err.detail.includes("already exists")) {
        return {
          errors: [
            {
              field: "username",
              message: "Esse nome já existe",
            },
          ],
        };
      }
    }
    req.session!.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "Esse usuário não existe",
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Senha Incorreta",
          },
        ],
      };
    }
    req.session!.userId = user.id;
    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    const result = new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie("qid");
        if (err) {
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
    return result;
  }
}
