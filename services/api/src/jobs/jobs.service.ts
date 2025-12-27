
import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@repo/db';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) { }

  async create(createJobDto: CreateJobDto, recruiterId: string) {
    // Determine the user's ID in our DB from Clerk ID if needed, 
    // or assume recruiterId is passed correctly from the controller.
    // For now, let's look up the user by Clerk ID first if we don't have the user object fully.

    // Actually, in the controller we get the full user via @User() ?? 
    // If @User returns { userId: 'clerk_id' }, we need to resolve it to our DB UUID.

    const recruiter = await this.prisma.user.findUnique({
      where: { clerkId: recruiterId },
    });

    if (!recruiter) {
      // In a real app, auto-create or throw error.
      // For MVP, assume user exists (created via webhook or lazy creation).
      throw new Error('Recruiter profile not found. Please complete profile first.');
    }

    return this.prisma.job.create({
      data: {
        ...createJobDto,
        recruiterId: recruiter.id,
        status: 'OPEN',
      },
    });
  }

  async findAll(query: { search?: string }) {
    const { search } = query;
    return this.prisma.job.findMany({
      where: {
        status: 'OPEN',
        ...(search ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { companyName: { contains: search, mode: 'insensitive' } },
          ],
        } : {}),
      },
      include: {
        recruiter: {
          select: { email: true, profile: { select: { fullName: true } } }
        }
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.job.findUnique({
      where: { id },
      include: {
        recruiter: true
      },
    });
  }

  async update(id: string, updateJobDto: UpdateJobDto, recruiterClerkId: string) {
    // Verify ownership
    const job = await this.prisma.job.findUnique({ where: { id }, include: { recruiter: true } });
    if (!job || job.recruiter.clerkId !== recruiterClerkId) {
      throw new Error('Unauthorized or Job not found');
    }

    return this.prisma.job.update({
      where: { id },
      data: updateJobDto,
    });
  }

  async remove(id: string, recruiterClerkId: string) {
    // Verify ownership
    const job = await this.prisma.job.findUnique({ where: { id }, include: { recruiter: true } });
    if (!job || job.recruiter.clerkId !== recruiterClerkId) {
      throw new Error('Unauthorized or Job not found');
    }
    return this.prisma.job.delete({ where: { id } });
  }
}
