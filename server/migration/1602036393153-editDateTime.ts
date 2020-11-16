import {MigrationInterface, QueryRunner} from "typeorm";

export class editDateTime1602036393153 implements MigrationInterface {
    name = 'editDateTime1602036393153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_e11e649824a45d8ed01d597fd93"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" datetimeoffset NOT NULL CONSTRAINT "DF_e11e649824a45d8ed01d597fd93" DEFAULT getdate()`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_80ca6e6ef65fb9ef34ea8c90f42"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" datetimeoffset NOT NULL CONSTRAINT "DF_80ca6e6ef65fb9ef34ea8c90f42" DEFAULT getdate()`);
        await queryRunner.query(`ALTER TABLE "mob" DROP CONSTRAINT "DF_2dc5049594b1cfb810261f28207"`);
        await queryRunner.query(`ALTER TABLE "mob" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "mob" ADD "createdAt" datetimeoffset NOT NULL CONSTRAINT "DF_2dc5049594b1cfb810261f28207" DEFAULT getdate()`);
        await queryRunner.query(`ALTER TABLE "mob" DROP CONSTRAINT "DF_996fdc5818eef912cb332c3840c"`);
        await queryRunner.query(`ALTER TABLE "mob" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "mob" ADD "updatedAt" datetimeoffset NOT NULL CONSTRAINT "DF_996fdc5818eef912cb332c3840c" DEFAULT getdate()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mob" DROP CONSTRAINT "DF_996fdc5818eef912cb332c3840c"`);
        await queryRunner.query(`ALTER TABLE "mob" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "mob" ADD "updatedAt" datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mob" ADD CONSTRAINT "DF_996fdc5818eef912cb332c3840c" DEFAULT getdate() FOR "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "mob" DROP CONSTRAINT "DF_2dc5049594b1cfb810261f28207"`);
        await queryRunner.query(`ALTER TABLE "mob" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "mob" ADD "createdAt" datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mob" ADD CONSTRAINT "DF_2dc5049594b1cfb810261f28207" DEFAULT getdate() FOR "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_80ca6e6ef65fb9ef34ea8c90f42"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "DF_80ca6e6ef65fb9ef34ea8c90f42" DEFAULT getdate() FOR "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_e11e649824a45d8ed01d597fd93"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "DF_e11e649824a45d8ed01d597fd93" DEFAULT getdate() FOR "createdAt"`);
    }

}
