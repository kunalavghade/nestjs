import { DataSource } from 'typeorm';
import { Report } from './reports.entity';

export const ReportsProvider = [
  {
    provide: 'REPORTS_RIPOSITORY',
    useFactory: (ds: DataSource) => ds.getRepository(Report),
    inject: ['DATA_SOURCE'],
  },
];
