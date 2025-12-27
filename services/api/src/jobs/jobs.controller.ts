
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ClerkAuthGuard } from '../auth/clerk-auth.guard';
import { User } from '../common/decorators/user.decorator';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Post()
  @UseGuards(ClerkAuthGuard)
  create(@Body() createJobDto: CreateJobDto, @User() user: any) {
    // Ideally check if user.role === 'RECRUITER'
    return this.jobsService.create(createJobDto, user.userId);
  }

  @Get()
  findAll(@Query('search') search?: string) {
    return this.jobsService.findAll({ search });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(ClerkAuthGuard)
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto, @User() user: any) {
    return this.jobsService.update(id, updateJobDto, user.userId);
  }

  @Delete(':id')
  @UseGuards(ClerkAuthGuard)
  remove(@Param('id') id: string, @User() user: any) {
    return this.jobsService.remove(id, user.userId);
  }
}
