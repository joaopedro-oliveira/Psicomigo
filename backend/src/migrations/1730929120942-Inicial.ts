// import {MigrationInterface, QueryRunner} from "typeorm";

// export class Inicial1730929120942 implements MigrationInterface {
//     name = 'Inicial1730929120942'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`CREATE TABLE "pergunta" ("id" SERIAL NOT NULL, "pergunta" character varying NOT NULL, "tipo" character varying NOT NULL, "topico" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "perguntaAtiva" boolean NOT NULL DEFAULT true, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "creatorId" integer NOT NULL, CONSTRAINT "PK_cd3254fbdc5b83baebe96a3c48e" PRIMARY KEY ("id"))`);
//         await queryRunner.query(`CREATE TABLE "opcoes_resposta" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "perguntaId" integer, CONSTRAINT "PK_8d22c70483f3d1b4cd710239cb1" PRIMARY KEY ("id"))`);
//         await queryRunner.query(`CREATE TABLE "resposta" ("id" SERIAL NOT NULL, "pergunta" character varying NOT NULL, "tipo" character varying NOT NULL, "pergunta_id" integer NOT NULL, "opcao_resposta" text, "opcao_resposta_escolhida" text, "resposta_livre" character varying, "respondido" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "questionarioId" integer, CONSTRAINT "PK_bf804c2c8d0434acf22e3e48f04" PRIMARY KEY ("id"))`);
//         await queryRunner.query(`CREATE TABLE "questionario" ("id" SERIAL NOT NULL, "usuarioId" integer NOT NULL, "respondido" boolean NOT NULL DEFAULT false, "dataReposta" TIMESTAMP, "peso" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_522cf4010d557b73ad2ed728d96" PRIMARY KEY ("id"))`);
//         await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "profilePicture" character varying NOT NULL DEFAULT 'default.jpg', "password" character varying NOT NULL, "email" text NOT NULL, "genero" text NOT NULL, "cpf" text NOT NULL, "dataNascimento" date, "tipo" text NOT NULL, "paciente_ativo" boolean DEFAULT true, "topicosPaciente" text array NOT NULL DEFAULT '{Geral}', "crm" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "medicoId" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87" UNIQUE ("cpf"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
//         await queryRunner.query(`ALTER TABLE "opcoes_resposta" ADD CONSTRAINT "FK_f299cd5ba0803a349a17547109a" FOREIGN KEY ("perguntaId") REFERENCES "pergunta"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "resposta" ADD CONSTRAINT "FK_1df2c9496d20ca029b5a483e478" FOREIGN KEY ("questionarioId") REFERENCES "questionario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f7fe79d0375e0fca94e07a43067" FOREIGN KEY ("medicoId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f7fe79d0375e0fca94e07a43067"`);
//         await queryRunner.query(`ALTER TABLE "resposta" DROP CONSTRAINT "FK_1df2c9496d20ca029b5a483e478"`);
//         await queryRunner.query(`ALTER TABLE "opcoes_resposta" DROP CONSTRAINT "FK_f299cd5ba0803a349a17547109a"`);
//         await queryRunner.query(`DROP TABLE "user"`);
//         await queryRunner.query(`DROP TABLE "questionario"`);
//         await queryRunner.query(`DROP TABLE "resposta"`);
//         await queryRunner.query(`DROP TABLE "opcoes_resposta"`);
//         await queryRunner.query(`DROP TABLE "pergunta"`);
//     }

// }
