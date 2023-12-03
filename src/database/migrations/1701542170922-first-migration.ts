import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1701542170922 implements MigrationInterface {
    name = 'FirstMigration1701542170922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "diagnoses" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "diagnosisText" character varying,
                "imageId" uuid,
                CONSTRAINT "PK_d1bfabf423f99c537817e6ad244" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "images" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "userId" uuid,
                "fileName" character varying,
                "filePath" character varying,
                CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "roles" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying,
                "tenantId" uuid,
                CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tenants" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying,
                "contact" character varying,
                CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" character varying,
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users_roles_roles" (
                "usersId" uuid NOT NULL,
                "rolesId" uuid NOT NULL,
                CONSTRAINT "PK_6c1a055682c229f5a865f2080c1" PRIMARY KEY ("usersId", "rolesId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_df951a64f09865171d2d7a502b" ON "users_roles_roles" ("usersId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_b2f0366aa9349789527e0c36d9" ON "users_roles_roles" ("rolesId")
        `);
        await queryRunner.query(`
            ALTER TABLE "diagnoses"
            ADD CONSTRAINT "FK_Diagnosis_imageId_Image_id" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "images"
            ADD CONSTRAINT "FK_Image_userId_User_id" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "roles"
            ADD CONSTRAINT "FK_Role_tenantId_Tenant_id" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles_roles"
            ADD CONSTRAINT "FK_df951a64f09865171d2d7a502b1" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles_roles"
            ADD CONSTRAINT "FK_b2f0366aa9349789527e0c36d97" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_b2f0366aa9349789527e0c36d97"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_df951a64f09865171d2d7a502b1"
        `);
        await queryRunner.query(`
            ALTER TABLE "roles" DROP CONSTRAINT "FK_Role_tenantId_Tenant_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "images" DROP CONSTRAINT "FK_Image_userId_User_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "diagnoses" DROP CONSTRAINT "FK_Diagnosis_imageId_Image_id"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_b2f0366aa9349789527e0c36d9"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_df951a64f09865171d2d7a502b"
        `);
        await queryRunner.query(`
            DROP TABLE "users_roles_roles"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TABLE "tenants"
        `);
        await queryRunner.query(`
            DROP TABLE "roles"
        `);
        await queryRunner.query(`
            DROP TABLE "images"
        `);
        await queryRunner.query(`
            DROP TABLE "diagnoses"
        `);
    }

}
