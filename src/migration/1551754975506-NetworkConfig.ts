import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class NetworkConfig1551754975506 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
CREATE TABLE network_config (
    project_id VARCHAR(255) NOT NULL PRIMARY KEY,
    port INT NOT NULL,
    status ENUM('Up', 'Exited') NOT NULL
);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
DROP TABLE network_config cascade;
        `);
    }
}
