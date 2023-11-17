import { Entity, ObjectIdColumn, Column, PrimaryColumn } from 'typeorm';
import { Status } from './status.enum';
import { ImageType } from '../image/image.type';
import { CreateImageInput } from 'gql/image/create-image.input';

@Entity()
export class Product {

  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  status: Status;

  @Column()
  images: string[]
}
