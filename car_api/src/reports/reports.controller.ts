import {
  Post,
  Body,
  Controller,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { ApproveReportDTO, ReportDTO, createReportDTO } from './dto/repots.dto';
import { AuthGuard } from 'src/guards/auth.gurd';
import { ReportsService } from './reports.service';
import { CurrentUser } from 'src/users/decorators/curr.user.decorator';
import { User } from 'src/users/entity/user.entity';
import { Serializer } from 'src/intercepter/serialize.intercepter';
import { AdminGuard } from 'src/guards/amin.guard';

@Controller('reports')
@Serializer(ReportDTO)
@UseGuards(AuthGuard)
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post()
  createReport(@Body() body: createReportDTO, @CurrentUser() user: User) {
    return this.reportService.save(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  upproveReport(@Param('id') id: number, @Body() body: ApproveReportDTO) {
    return this.reportService.approve(id, body.approve);
  }
}
