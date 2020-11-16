import {MigrationInterface, QueryRunner} from "typeorm";

export class addBaseEntity1602035684140 implements MigrationInterface {
    name = 'addBaseEntity1602035684140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" datetime NOT NULL CONSTRAINT "DF_e11e649824a45d8ed01d597fd93" DEFAULT getdate()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" datetime NOT NULL CONSTRAINT "DF_80ca6e6ef65fb9ef34ea8c90f42" DEFAULT getdate()`);
        await queryRunner.query(`ALTER TABLE "mob" ADD "createdAt" datetime NOT NULL CONSTRAINT "DF_2dc5049594b1cfb810261f28207" DEFAULT getdate()`);
        await queryRunner.query(`ALTER TABLE "mob" ADD "updatedAt" datetime NOT NULL CONSTRAINT "DF_996fdc5818eef912cb332c3840c" DEFAULT getdate()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mob" DROP CONSTRAINT "DF_996fdc5818eef912cb332c3840c"`);
        await queryRunner.query(`ALTER TABLE "mob" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "mob" DROP CONSTRAINT "DF_2dc5049594b1cfb810261f28207"`);
        await queryRunner.query(`ALTER TABLE "mob" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_80ca6e6ef65fb9ef34ea8c90f42"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_e11e649824a45d8ed01d597fd93"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
    }

}
