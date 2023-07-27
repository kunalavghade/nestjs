import { Inject, Injectable } from '@nestjs/common';
import { Report } from './entity/reports.entity';
import { Repository } from 'typeorm';
import { createReportDTO } from './dto/repots.dto';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @Inject('REPORTS_RIPOSITORY')
    private reportRepo: Repository<Report>,
  ) {}

  async findAll() {
    return this.reportRepo.find();
  }

  async save(report: createReportDTO, user: User) {
    const entity = this.reportRepo.create(report);
    entity.user = user;
    return this.reportRepo.save(entity);
  }
}
