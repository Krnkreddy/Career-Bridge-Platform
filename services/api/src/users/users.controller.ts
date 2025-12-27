
import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { ClerkAuthGuard } from '../auth/clerk-auth.guard';
import { User } from '../common/decorators/user.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('me')
    @UseGuards(ClerkAuthGuard)
    async getProfile(@User() user: any) {
        return this.usersService.findUserByClerkId(user.userId);
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
