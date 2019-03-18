import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Photos1551754975507 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
CREATE TABLE photos (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    test_table_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (test_table_id)
    REFERENCES test_table(id)
);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
DROP TABLE photos cascade;
        `);
    }
}
