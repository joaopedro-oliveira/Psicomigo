import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { randomBytes } from "crypto"; // Use Node.js built-in crypto

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @BeforeInsert()
  generateUserKey() {
    this.userKey = randomBytes(32).toString("hex");
  }

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ unique: true })
  username!: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", length: 32, unique: true, nullable: true })
  userKey: string;

  @Field()
  @Column({ default: "default.jpg" })
  profilePicture!: string;

  @Column()
  password!: string;

  @Field()
  @Column({ type: "text", unique: true })
  email!: string;

  @Field(() => String)
  @Column({ type: "text" })
  genero!: string;

  @Field(() => String)
  @Column({ type: "text", unique: true })
  cpf!: string;

  @Field(() => Date, { nullable: true })
  @Column({ type: "timestamp without time zone", nullable: true })
  dataNascimento?: Date;

  @Field(() => String)
  @Column({ type: "text" })
  tipo!: string;

  @Field(() => Boolean)
  @Column({ default: true, nullable: true })
  paciente_ativo?: boolean;

  @Field(() => [String])
  @Column({ type: "text", default: ["Geral"], array: true })
  topicosPaciente: string[];

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  crm?: string;

  // @OneToMany(() => Updoot, (updoot) => updoot.user)
  // updoots: Updoot[];

  // @OneToMany(() => Post, (post) => post.creator)
  // posts: Post[];

  // @Field(() => Message)
  // @OneToMany(() => Message, (message) => message.creator)
  // messages: Message[];

  @Field(() => [User], { nullable: true })
  @OneToMany(() => User, (user) => user.medico, { cascade: true })
  @JoinTable()
  pacientes?: User[];

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.pacientes, { nullable: true })
  medico?: User;

  // @Field(() => Int)
  // @Column({ default: 0 })
  // followerCount: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
