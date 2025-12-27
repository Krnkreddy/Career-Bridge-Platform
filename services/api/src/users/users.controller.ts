import { Controller, Get, Post, Body, UseGuards, Request, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { ClerkAuthGuard } from '../auth/clerk-auth.guard';
import { User } from '../common/decorators/user.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('me')
    @UseGuards(ClerkAuthGuard)
    async getProfile(@User() user: any) {
        return this.usersService.findUserByClerkId(user.userId);
    }

    @Patch('me/profile')
    @UseGuards(ClerkAuthGuard)
    async updateProfile(@Body() updateProfileDto: UpdateProfileDto, @User() user: any) {
        // Resolve DB ID first
        const dbUser = await this.usersService.findUserByClerkId(user.userId);
        if (!dbUser) throw new Error("User not found");

        return this.usersService.updateUser(dbUser.id, {
            profile: {
                upsert: {
                    create: updateProfileDto,
                    update: updateProfileDto
                }
            }
        });
    }

    // Webhook for Clerk (Public endpoint, should verify formatting/signature in real prod)
    @Post('webhook')
    async handleClerkWebhook(@Body() payload: any) {
        // Basic implementation for MVP sync
        if (payload.type === 'user.created') {
            const { id, email_addresses, first_name, last_name } = payload.data;
            const email = email_addresses[0]?.email_address;

            await this.usersService.createUser({
                clerkId: id,
                email: email,
                profile: {
                    create: {
                        fullName: `${first_name} ${last_name}`,
                    }
                }
            });
            return { status: 'User created' };
        }
        return { status: 'Ignored' };
    }
}
