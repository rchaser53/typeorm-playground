import "reflect-metadata";
import { createConnection, Entity, ConnectionOptions, PrimaryColumn, Column} from "typeorm";

@Entity('test_table')
export class TestTable {
    @PrimaryColumn("varchar")
    id: string;

    @Column({ nullable: false })
    num_field: number;

    @Column({ nullable: false })
    enum_field: string;
}

const options: ConnectionOptions = {
  "name": "mysql",
  "type": "mysql",
  "host": "127.0.0.1",
  "port": 3306,
  "username": "root",
  "password": "root",
  "database": "test_database",
  entities: [TestTable]
};

(async () => {
  try {
    const id ='id_b'
    const connection = await createConnection(options);
    let networkConfig = new TestTable();
    networkConfig.id = id;
    networkConfig.num_field = 3001;
    networkConfig.enum_field = 'aaa';
  
    let postRepository = connection.getRepository(TestTable);
    // await postRepository.save(networkConfig);
    
    // await postRepository.update(networkConfig, {
    //   status: 'bbb'
    // });

    // await postRepository.delete({
    //   id
    // });

    const hoge = await postRepository.find({
      id
    })

    console.log(hoge)
    
    await connection.close();
  } catch (error) {
    throw new Error(error)
  }
})()