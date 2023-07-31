import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Report } from './entity/reports.entity';
import { Repository } from 'typeorm';
import { createReportDTO, getEstimateDto } from './dto/repots.dto';
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
    const rmp = await this.reportRepo.save(entity);
    return rmp;
  }

  async findOne(id: number) {
    return await this.reportRepo.findOne({
      relations: { user: true },
      where: { id: id },
    });
  }

  async approve(id: number, approve: boolean) {
    const report = await this.findOne(id);

    if (!report) {
      throw new NotFoundException('report Not found');
    }
    report.approved = approve;
    return await this.reportRepo.save(report);
  }

  createEstimate({ make, lng, lat, year, mileage }: getEstimateDto) {
    return this.reportRepo
      .createQueryBuilder()
      .select('*')
      .where('make = :make', { make })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -5 AND 5', { year })
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawMany();
  }
}
