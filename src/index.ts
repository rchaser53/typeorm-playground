import "reflect-metadata";
import {  PrimaryGeneratedColumn, createConnection, OneToMany, JoinColumn, OneToOne,
          getConnection, Entity, ManyToOne, ConnectionOptions, PrimaryColumn, Column} from "typeorm";

@Entity('test_table')
export class TestTable {
    @PrimaryColumn("varchar")
    id: string;

    @Column({ nullable: false })
    num_field: number;

    @OneToMany(type => Photo, photo => photo.test_table)
    @JoinColumn({ name: 'id' })
    photos: Photo[];
}

@Entity('photos')
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(type => TestTable, test_table => test_table.photos)
  @JoinColumn({ name: 'test_table_id' })
  test_table: TestTable

  @Column()
  test_table_id?: string;

  @OneToOne(type => PhotoInfo, photoInfo => photoInfo.photo)
  @JoinColumn({ name: 'id' })
  photo_info: PhotoInfo;
}

@Entity('photo_info')
export class PhotoInfo {
  @PrimaryColumn("varchar")
  id: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  photo_id: string;

  @OneToOne(type => Photo, photo => photo.photo_info)
  @JoinColumn({ name: 'photo_id' })
  photo: Photo;
}

const createPhoto = (id, url, test_table_id) => {
  const photo = new Photo()
  photo.id = id
  photo.url = url
  photo.test_table_id = test_table_id
  return photo
}

const options: ConnectionOptions = {
  "name": "mysql",
  "type": "mysql",
  "host": "127.0.0.1",
  "port": 3306,
  "username": "root",
  "password": "root",
  "database": "test_database",
  entities: [TestTable, Photo, PhotoInfo],
  logging: ["query", "error"]
};

const createPhotoInfo = (id, description, photo_id): PhotoInfo => {
  const photoInfo = new PhotoInfo()
  photoInfo.id = id
  photoInfo.description = description
  photoInfo.photo_id = photo_id
  return photoInfo
}

(async () => {
  try {
    const id ='photo_id_a'
    const connection = await createConnection(options);
    await connection.transaction(async (manager) => {
      // const photoA = createPhoto('b', 'url-b', id)
      // let testTable = new TestTable();
      // testTable.id = id;
      // testTable.num_field = 3001;
      // testTable.photos = [
      //   createPhoto('a', 'url-a', id),
      // ];
      
      const photos = await manager
            .getRepository(Photo)
            .createQueryBuilder("photo")
            .innerJoinAndSelect("photo.test_table", "test_table")
            .getMany();
      console.log(photos);

      const test_table = await manager
            .getRepository(TestTable)
            .createQueryBuilder("test_table")
            .innerJoinAndSelect("test_table.photos", "photos")
            .getMany();
      console.log(test_table)

      // await transactionalEntityManager.save(testTable)
      // await transactionalEntityManager.save(createPhotoInfo('photoId', 'test_desc', id))
    })

    // await postRepository.update(testTable, {
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
  return 'finish'
})().then((ret) => {
  console.log(ret)
}).catch((err) => {
  console.error(err)
})