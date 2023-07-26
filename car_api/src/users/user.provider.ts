import { DataSource } from 'typeorm';
import { User } from './user.entity';

export const UserProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (ds: DataSource) => ds.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
