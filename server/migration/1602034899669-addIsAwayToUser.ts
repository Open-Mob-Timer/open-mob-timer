import {MigrationInterface, QueryRunner} from "typeorm";

export class addIsAwayToUser1602034899669 implements MigrationInterface {
    name = 'addIsAwayToUser1602034899669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isAway" bit NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAway"`);
    }

}
