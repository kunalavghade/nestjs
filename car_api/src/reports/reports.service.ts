import { Inject, Injectable } from '@nestjs/common';
import { Report } from './reports.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {
  constructor(
    @Inject('REPORTS_RIPOSITORY')
    private reportRepo: Repository<Report>,
  ) {}

  async findAll(): Promise<Report[]> {
    return this.reportRepo.find();
  }

  @Inject('REPORTS_RIPOSITORY')
  async save(report: Report) {
    return this.reportRepo.save(report);
  }
}
