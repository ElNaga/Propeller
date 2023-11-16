import { Entity, ObjectIdColumn, Column, PrimaryColumn } from 'typeorm';
import { Status } from './status.enum';

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
}
