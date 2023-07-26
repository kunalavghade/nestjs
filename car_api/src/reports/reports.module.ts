import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ReportsProvider } from './repo/reports.provider';

import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ReportsController],
  providers: [ReportsService, ...ReportsProvider],
})
export class ReportsModule {}
