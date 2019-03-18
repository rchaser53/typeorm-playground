import "reflect-metadata";
import {  PrimaryGeneratedColumn, createConnection, OneToMany, JoinColumn,
          Entity, ManyToOne, ConnectionOptions, PrimaryColumn, Column} from "typeorm";

@Entity('test_table')
export class TestTable {
    @PrimaryColumn("varchar")
    id: string;

    @Column({ nullable: false })
    num_field: number;

    @OneToMany(type => Photo, photo => photo.test_table)
    readonly photos: Photo[];
}

@Entity('photos')
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(type => TestTable, test_table => test_table.photos)
  @JoinColumn({ name: 'test_table_id' })
  readonly test_table?: TestTable;

}

const options: ConnectionOptions = {
  "name": "mysql",
  "type": "mysql",
  "host": "127.0.0.1",
  "port": 3306,
  "username": "root",
  "password": "root",
  "database": "test_database",
  entities: [TestTable, Photo]
};

(async () => {
  try {
    const id ='id_b'
    const connection = await createConnection(options);
    let networkConfig = new TestTable();
    networkConfig.id = id;
    networkConfig.num_field = 3001;
    // networkConfig.photos = [

    // ]
    // networkConfig.enum_field = 'aaa';
  
    let postRepository = connection.getRepository(TestTable);
    // await postRepository.save(networkConfig);
    
    // await postRepository.update(networkConfig, {
    //   status: 'bbb'
    // });

    // await postRepository.delete({
    //   id
    // });

    // const hoge = await postRepository.find({
    //   id
    // })

    // console.log(hoge)
    
    await connection.close();
  } catch (error) {
    throw new Error(error)
  }
})()