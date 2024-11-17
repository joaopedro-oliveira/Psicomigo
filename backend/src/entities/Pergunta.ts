import { Field, Int, ObjectType } from "type-graphql";
import {
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  BaseEntity,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { OpcoesResposta } from "./OpcoesResposta";
import { Resposta } from "./Resposta";
import { Questionario } from "./Questionario";

@ObjectType()
@Entity()
export class Pergunta extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  pergunta!: string;

  @Field()
  @Column()
  tipo!: string;

  @Field(() => String)
  @Column()
  topico: string;

  @Field(() => [OpcoesResposta], { nullable: true })
  @OneToMany(
    () => OpcoesResposta,
    (opcoes_respostas) => opcoes_respostas.pergunta,
    { nullable: true, cascade: true, onDelete: "CASCADE" }
  )
  opcoes_respostas: OpcoesResposta[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column({ default: true })
  perguntaAtiva!: boolean;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Int)
  @Column()
  creatorId: number;
}
