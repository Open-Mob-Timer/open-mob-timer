import {MigrationInterface, QueryRunner} from "typeorm";

export class editUserTurnEndsAt1602043005563 implements MigrationInterface {
    name = 'editUserTurnEndsAt1602043005563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "turnEndsAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "turnEndsAt" datetimeoffset`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "turnEndsAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "turnEndsAt" datetime NOT NULL`);
    }

}
