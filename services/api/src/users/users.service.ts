
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@repo/db';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data,
        });
    }

    async findUserByClerkId(clerkId: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { clerkId },
            include: { profile: true },
        });
    }

    async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }
}
