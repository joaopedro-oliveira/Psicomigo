import { MigrationInterface, QueryRunner } from "typeorm";
import argon2 from "argon2";
import { randomBytes } from "crypto";

export class DadosParaTeste1730929129803 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password1 = await argon2.hash("doutor");
    const password2 = await argon2.hash("paciente1");
    const password3 = await argon2.hash("paciente2");
    await queryRunner.query(`
                        INSERT INTO "user" ("username", "profilePicture", "password", "email", "genero", "cpf", "tipo", "crm", "createdAt", "updatedAt", "userKey") VALUES
                        ('Lucas', 'default.jpg', '${password1}', 'doutor@email.com', 'M', '123.456.789.10', 'Doutor', '12345-SP', NOW(), NOW(), '${randomBytes(
      16
    ).toString("hex")}'),
                        ('Jose', 'default.jpg', '${password2}', 'paciente1@email.com', 'M', '123.456.789.11', 'Paciente', NULL, NOW(), NOW(), '${randomBytes(
      16
    ).toString("hex")}'),
                        ('Maria', 'default.jpg', '${password3}', 'paciente2@email.com', 'F', '123.456.789.12', 'Paciente', NULL, NOW(), NOW(), '${randomBytes(
      16
    ).toString("hex")}');
                    `);
    const lucasId = await queryRunner.query(
      `SELECT id FROM "user" WHERE username = 'Lucas'`
    );
    const joseId = await queryRunner.query(
      `SELECT id FROM "user" WHERE username = 'Jose'`
    );
    const mariaId = await queryRunner.query(
      `SELECT id FROM "user" WHERE username = 'Maria'`
    );
    await queryRunner.query(
      `
                        UPDATE "user"
                        SET "medicoId" = $1
                        WHERE "id" IN ($2, $3)
                    `,
      [lucasId[0].id, joseId[0].id, mariaId[0].id]
    );
    await queryRunner.query(`
                        UPDATE "user"
                        SET "topicosPaciente" = ARRAY['Geral', 'Ansiedade']
                        WHERE "username" = 'Jose'
                    `);
    await queryRunner.query(`
                        UPDATE "user"
                        SET "topicosPaciente" = ARRAY['Geral', 'Depressão']
                        WHERE "username" = 'Maria'
                    `);

    await queryRunner.query(`
                      INSERT INTO "pergunta" ("pergunta", "tipo", "topico", "createdAt", "updatedAt", "creatorId") VALUES
                      ('Com que frequência você se sente preocupado com situações cotidianas?', 'escolha única', 'Ansiedade', NOW(), NOW(), ${[
                        lucasId[0].id,
                      ]}),
                      ('Quais estratégias você costuma usar para lidar com a ansiedade?', 'resposta livre', 'Ansiedade', NOW(), NOW(), ${[
                        lucasId[0].id,
                      ]}),
                      ('Como está hoje?', 'escolha única', 'Ansiedade', NOW(), NOW(), ${[
                        lucasId[0].id,
                      ]}),
                      ('O que está te afetando hoje?', 'múltipla escolha', 'Ansiedade', NOW(), NOW(),${[
                        lucasId[0].id,
                      ]}),
                      ('Nos últimos dias, como você avaliaria seu nível de ânimo?', 'escolha única', 'Depressão', NOW(), NOW(), ${[
                        lucasId[0].id,
                      ]}),
                      ('O que você mais sente falta em relação às atividades que costumava gostar?', 'resposta livre', 'Depressão', NOW(), NOW(), ${[
                        lucasId[0].id,
                      ]}),
                      ('Você tem notado mudanças no seu apetite ou peso?', 'escolha única', 'Depressão', NOW(), NOW(),${[
                        lucasId[0].id,
                      ]}),
                      ('Com que frequência você tem pensamentos negativos sobre si mesmo?', 'escolha única', 'Depressão', NOW(), NOW(), ${[
                        lucasId[0].id,
                      ]});
                  `);
    await queryRunner.query(`
                      INSERT INTO "opcoes_resposta" ("text", "perguntaId", "createdAt", "updatedAt") VALUES
                      -- Opções para "Com que frequência você se sente preocupado com situações cotidianas?"
                      ('Nunca', (SELECT id FROM pergunta WHERE pergunta = 'Com que frequência você se sente preocupado com situações cotidianas?'), NOW(), NOW()),
                      ('Raramente', (SELECT id FROM pergunta WHERE pergunta = 'Com que frequência você se sente preocupado com situações cotidianas?'), NOW(), NOW()),
                      ('Às vezes', (SELECT id FROM pergunta WHERE pergunta = 'Com que frequência você se sente preocupado com situações cotidianas?'), NOW(), NOW()),
                      ('Frequentemente', (SELECT id FROM pergunta WHERE pergunta = 'Com que frequência você se sente preocupado com situações cotidianas?'), NOW(), NOW()),
                      ('Sempre', (SELECT id FROM pergunta WHERE pergunta = 'Com que frequência você se sente preocupado com situações cotidianas?'), NOW(), NOW()),
              
                      -- Opções para "Como está hoje?"
                      ('Muito ruim', (SELECT id FROM pergunta WHERE pergunta = 'Como está hoje?'), NOW(), NOW()),
                      ('Ruim', (SELECT id FROM pergunta WHERE pergunta = 'Como está hoje?'), NOW(), NOW()),
                      ('Normal', (SELECT id FROM pergunta WHERE pergunta = 'Como está hoje?'), NOW(), NOW()),
                      ('Feliz', (SELECT id FROM pergunta WHERE pergunta = 'Como está hoje?'), NOW(), NOW()),
                      ('Muito Feliz', (SELECT id FROM pergunta WHERE pergunta = 'Como está hoje?'), NOW(), NOW()),
              
                      -- Opções para "O que está te afetando hoje?"
                      ('Trabalho', (SELECT id FROM pergunta WHERE pergunta = 'O que está te afetando hoje?'), NOW(), NOW()),
                      ('Relações sociais', (SELECT id FROM pergunta WHERE pergunta = 'O que está te afetando hoje?'), NOW(), NOW()),
                      ('Mudanças de rotina', (SELECT id FROM pergunta WHERE pergunta = 'O que está te afetando hoje?'), NOW(), NOW()),
                      ('Problemas pessoais', (SELECT id FROM pergunta WHERE pergunta = 'O que está te afetando hoje?'), NOW(), NOW()),
                      ('Estou bem', (SELECT id FROM pergunta WHERE pergunta = 'O que está te afetando hoje?'), NOW(), NOW()),
                      ('Outro', (SELECT id FROM pergunta WHERE pergunta = 'O que está te afetando hoje?'), NOW(), NOW()),
              
                      -- Opções para "Nos últimos dias, como você avaliaria seu nível de ânimo?"
                      ('Muito baixo', (SELECT id FROM pergunta WHERE pergunta = 'Nos últimos dias, como você avaliaria seu nível de ânimo?'), NOW(), NOW()),
                      ('Baixo', (SELECT id FROM pergunta WHERE pergunta = 'Nos últimos dias, como você avaliaria seu nível de ânimo?'), NOW(), NOW()),
                      ('Médio', (SELECT id FROM pergunta WHERE pergunta = 'Nos últimos dias, como você avaliaria seu nível de ânimo?'), NOW(), NOW()),
                      ('Alto', (SELECT id FROM pergunta WHERE pergunta = 'Nos últimos dias, como você avaliaria seu nível de ânimo?'), NOW(), NOW()),
                      ('Muito alto', (SELECT id FROM pergunta WHERE pergunta = 'Nos últimos dias, como você avaliaria seu nível de ânimo?'), NOW(), NOW()),
              
                      -- Opções para "Você tem notado mudanças no seu apetite ou peso?"
                      ('Nenhuma mudança', (SELECT id FROM pergunta WHERE pergunta = 'Você tem notado mudanças no seu apetite ou peso?'), NOW(), NOW()),
                      ('Pequena mudança', (SELECT id FROM pergunta WHERE pergunta = 'Você tem notado mudanças no seu apetite ou peso?'), NOW(), NOW()),
                      ('Mudança moderada', (SELECT id FROM pergunta WHERE pergunta = 'Você tem notado mudanças no seu apetite ou peso?'), NOW(), NOW()),
                      ('Grande mudança', (SELECT id FROM pergunta WHERE pergunta = 'Você tem notado mudanças no seu apetite ou peso?'), NOW(), NOW()),
                      ('Mudança extrema', (SELECT id FROM pergunta WHERE pergunta = 'Você tem notado mudanças no seu apetite ou peso?'), NOW(), NOW()),
              
                      -- Opções para "Com que frequência você tem pensamentos negativos sobre si mesmo?"
                      ('Nunca', (SELECT id FROM pergunta WHERE pergunta = 'Com que frequência você tem pensamentos negativos sobre si mesmo?'), NOW(), NOW()),
                      ('Raramente', (SELECT id FROM pergunta WHERE pergunta = 'Com que frequência você tem pensamentos negativos sobre si mesmo?'), NOW(), NOW()),
                      ('Às vezes', (SELECT id FROM pergunta WHERE pergunta = 'Com que frequência você tem pensamentos negativos sobre si mesmo?'), NOW(), NOW()),
                      ('Frequentemente', (SELECT id FROM pergunta WHERE pergunta = 'Com que frequência você tem pensamentos negativos sobre si mesmo?'), NOW(), NOW()),
                      ('Sempre', (SELECT id FROM pergunta WHERE pergunta = 'Com que frequência você tem pensamentos negativos sobre si mesmo?'), NOW(), NOW());
                  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "user" WHERE "username" IN ('Lucas', 'Jose', 'Maria');`
    );
    await queryRunner.query(`DELETE FROM "opcoes_resposta";`);
    await queryRunner.query(`DELETE FROM "pergunta";`);
  }
}
