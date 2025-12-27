
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ClerkAuthGuard } from '../auth/clerk-auth.guard';
import { User } from '../common/decorators/user.decorator';

@Controller('applications')
@UseGuards(ClerkAuthGuard)
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) { }

  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto, @User() user: any) {
    return this.applicationsService.apply(createApplicationDto, user.userId);
  }

  @Get('student')
  findAllForStudent(@User() user: any) {
    return this.applicationsService.findAllForStudent(user.userId);
  }

  @Get('job/:jobId')
  findAllForJob(@Param('jobId') jobId: string, @User() user: any) {
    return this.applicationsService.findAllForJob(jobId, user.userId);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'APPLIED' | 'REVIEWING' | 'INTERVIEW' | 'OFFER' | 'REJECTED',
    @User() user: any
  ) {
    return this.applicationsService.updateStatus(id, status, user.userId);
  }
}
