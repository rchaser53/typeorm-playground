import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class TestTable1551754975506 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
CREATE TABLE test_table (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    num_field INT NOT NULL,
    enum_field ENUM('aaa', 'bbb') NOT NULL
);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
DROP TABLE test_table cascade;
        `);
    }
}
