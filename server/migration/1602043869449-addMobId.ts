import {MigrationInterface, QueryRunner} from "typeorm";

export class addMobId1602043869449 implements MigrationInterface {
    name = 'addMobId1602043869449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_d143a46a7b41fb15cb5a8c5b7f6"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "mobId" uniqueidentifier NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_d143a46a7b41fb15cb5a8c5b7f6" FOREIGN KEY ("mobId") REFERENCES "mob"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_d143a46a7b41fb15cb5a8c5b7f6"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "mobId" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_d143a46a7b41fb15cb5a8c5b7f6" FOREIGN KEY ("mobId") REFERENCES "mob"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
