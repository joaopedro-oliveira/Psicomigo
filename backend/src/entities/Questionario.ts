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
  JoinTable,
} from "typeorm";
import { Resposta } from "./Resposta";
import { Pergunta } from "./Pergunta";

@ObjectType()
@Entity()
export class Questionario extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Int)
  @Column()
  usuarioId!: number;

  @Field(() => [Resposta], { nullable: true })
  @OneToMany(() => Resposta, (resposta) => resposta.questionario, {
    nullable: true,
  })
  respostas: Resposta[];

  @Field(() => Boolean)
  @Column({ type: "boolean", default: false })
  respondido!: boolean;

  @Field()
  @Column({ type: "int", default: 0 })
  peso!: number;

  @Field(() => Date, { nullable: true })
  @Column({
    default: null,
    type: "timestamp without time zone",
    nullable: true,
  })
  dataFinalizacao: Date;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
