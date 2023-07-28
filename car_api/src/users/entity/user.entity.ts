// import { Exclude } from 'class-transformer';
import { Report } from 'src/reports/entity/reports.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
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

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @Column({ default: true })
  admin: boolean;

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
