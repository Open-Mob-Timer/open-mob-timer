import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1602030160612 implements MigrationInterface {
    name = 'initialMigration1602030160612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_cace4a159ff9f2512dd42373760" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, "turnEndsAt" datetime NOT NULL, "mobId" uniqueidentifier, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mob" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_2c719f4109df094a2984471a0e6" DEFAULT NEWSEQUENTIALID(), CONSTRAINT "PK_2c719f4109df094a2984471a0e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_d143a46a7b41fb15cb5a8c5b7f6" FOREIGN KEY ("mobId") REFERENCES "mob"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_d143a46a7b41fb15cb5a8c5b7f6"`);
        await queryRunner.query(`DROP TABLE "mob"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
