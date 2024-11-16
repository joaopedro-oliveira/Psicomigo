import { Field, Int, ObjectType } from "type-graphql";
import {
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  OneToOne,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Pergunta } from "./Pergunta";
import { Questionario } from "./Questionario";
import { OpcoesResposta } from "../types";

@ObjectType()
export class OpcoesRespostaInterface {
  @Field(() => Int, { nullable: true })
  id: number;
  @Field(() => String, { nullable: true })
  text: string;
}

@ObjectType()
@Entity()
export class Resposta extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  pergunta!: string;

  @Field(() => String)
  @Column()
  tipo!: string;

  @Field(() => Int)
  @Column()
  pergunta_id!: number;

  @Field(() => Questionario, { nullable: true })
  @ManyToOne(() => Questionario, (questionario) => questionario.respostas)
  questionario: Questionario;

  @Field(() => [OpcoesRespostaInterface], { nullable: true })
  @Column("simple-json", { nullable: true })
  opcao_resposta?: { id?: number; text?: string }[];

  @Field(() => [OpcoesRespostaInterface], { nullable: true })
  @Column("simple-json", { nullable: true })
  opcao_resposta_escolhida?: { id?: number; text?: string }[];

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  resposta_livre: string;

  @Field(() => Boolean)
  @Column({ default: false })
  respondido!: boolean;

  @Field(() => Date, { nullable: true })
  @Column("timestamp without time zone", { nullable: true })
  dataResposta: Date;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
