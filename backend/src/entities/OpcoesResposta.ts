import { Field, Int, ObjectType } from "type-graphql";
import {
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Pergunta } from "./Pergunta";

@ObjectType()
@Entity()
export class OpcoesResposta extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  text!: string;

  @Field(() => Pergunta)
  @ManyToOne(() => Pergunta, (pergunta) => pergunta.opcoes_respostas, {
    onDelete: "CASCADE",
  })
  pergunta: Pergunta;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
