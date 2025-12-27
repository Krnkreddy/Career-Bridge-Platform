
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) { }

  async apply(createApplicationDto: CreateApplicationDto, studentClerkId: string) {
    // 1. Resolve Student ID
    const student = await this.prisma.user.findUnique({ where: { clerkId: studentClerkId } });
    if (!student) throw new NotFoundException('Student profile not found');

    // 2. Check for duplicate application
    const existing = await this.prisma.application.findUnique({
      where: {
        jobId_studentId: {
          jobId: createApplicationDto.jobId,
          studentId: student.id,
        },
      },
    });

    if (existing) {
      throw new ConflictException('You have already applied to this job.');
    }

    // 3. Create Application
    return this.prisma.application.create({
      data: {
        jobId: createApplicationDto.jobId,
        studentId: student.id,
        status: 'APPLIED',
      },
    });
  }

  async findAllForStudent(studentClerkId: string) {
    const student = await this.prisma.user.findUnique({ where: { clerkId: studentClerkId } });
    if (!student) throw new NotFoundException('Student not found');

    return this.prisma.application.findMany({
      where: { studentId: student.id },
      include: {
        job: {
          include: { recruiter: { include: { profile: true } } }
        }
      },
      orderBy: { appliedAt: 'desc' },
    });
  }

  async findAllForJob(jobId: string, recruiterClerkId: string) {
    // Verify Recruiter owns the job
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: { recruiter: true }
    });

    if (!job || job.recruiter.clerkId !== recruiterClerkId) {
      throw new NotFoundException('Job not found or unauthorized');
    }

    return this.prisma.application.findMany({
      where: { jobId },
      include: {
        student: {
          include: { profile: true }
        }
      },
      orderBy: { appliedAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: 'APPLIED' | 'REVIEWING' | 'INTERVIEW' | 'OFFER' | 'REJECTED', recruiterClerkId: string) {
    const application = await this.prisma.application.findUnique({
      where: { id },
      include: { job: { include: { recruiter: true } } }
    });

    if (!application || application.job.recruiter.clerkId !== recruiterClerkId) {
      throw new NotFoundException('Application not found or unauthorized');
    }

    return this.prisma.application.update({
      where: { id },
      data: { status },
    });
  }
}
