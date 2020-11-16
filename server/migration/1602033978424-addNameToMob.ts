import {MigrationInterface, QueryRunner} from "typeorm";

export class addNameToMob1602033978424 implements MigrationInterface {
    name = 'addNameToMob1602033978424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mob" ADD "name" nvarchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mob" DROP COLUMN "name"`);
    }

}
