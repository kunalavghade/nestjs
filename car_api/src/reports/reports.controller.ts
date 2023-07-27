import { Post, Body, Controller, UseGuards } from '@nestjs/common';
import { createReportDTO } from './dto/repots.dto';
import { AuthGuard } from 'src/guards/auth.gurd';
import { ReportsService } from './reports.service';
import { CurrentUser } from 'src/users/decorators/curr.user.decorator';
import { User } from 'src/users/entity/user.entity';

@Controller('reports')
@UseGuards(AuthGuard)
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post()
  createReport(@Body() body: createReportDTO, @CurrentUser() user: User) {
    return this.reportService.save(body, user);
  }
}
