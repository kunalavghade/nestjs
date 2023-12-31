import { DataSource } from 'typeorm';
import { Report } from '../entity/reports.entity';

export const ReportsProvider = [
  {
    provide: 'REPORTS_RIPOSITORY',
    useFactory: (ds: DataSource) => ds.getRepository(Report),
    inject: ['DATA_SOURCE'],
  },
];
