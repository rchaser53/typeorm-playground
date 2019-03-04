import "reflect-metadata";
import { createConnection, Entity, ConnectionOptions, PrimaryColumn, Column} from "typeorm";

@Entity()
export class NetworkConfig {
    @PrimaryColumn("varchar")
    project_id: string;

    @Column({ nullable: false })
    port: number;

    @Column({ nullable: false })
    status: string;
}

const options: ConnectionOptions = {
  "name": "mysql",
  "type": "mysql",
  "host": "127.0.0.1",
  "port": 3306,
  "username": "root",
  "password": "root",
  "database": "test_database",
  entities: [NetworkConfig]
};

(async () => {
  try {
    const connection = await createConnection(options);
    let networkConfig = new NetworkConfig();
    networkConfig.project_id = "id_e";
    networkConfig.port = 3001;
    networkConfig.status = 'Up';
  
    let postRepository = connection.getRepository(NetworkConfig);
    await postRepository.save(networkConfig);
    await connection.close();
  } catch (error) {
    throw new Error(error)
  }
})()