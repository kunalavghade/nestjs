// import { Exclude } from 'class-transformer';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  // @Exclude() -> not good way
  @Column()
  password: string;

  @AfterInsert()
  loginsert() {
    console.log('Inserted user with id : ', this.id);
  }

  @AfterRemove()
  logremove() {
    console.log('Removed user with id : ', this.id);
  }

  @AfterUpdate()
  logupdate() {
    console.log('Updated user with id : ', this.id);
  }
}
