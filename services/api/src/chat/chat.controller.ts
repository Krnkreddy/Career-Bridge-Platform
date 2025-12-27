
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ClerkAuthGuard } from '../auth/clerk-auth.guard';
import { User } from '../common/decorators/user.decorator';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('chat')
@UseGuards(ClerkAuthGuard)
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Post()
    createMessage(@Body() createMessageDto: CreateMessageDto, @User() user: any) {
        return this.chatService.createMessage(createMessageDto, user.userId);
    }

    @Get('conversations')
    getConversations(@User() user: any) {
        return this.chatService.getConversations(user.userId);
    }

    @Post('conversation')
    createConversation(@Body('recipientId') recipientId: string, @User() user: any) {
        return this.chatService.createConversation(recipientId, user.userId);
    }

    @Get('conversations/:id/messages')
    getMessages(@Param('id') id: string, @User() user: any) {
        return this.chatService.getMessages(id, user.userId);
    }
}
