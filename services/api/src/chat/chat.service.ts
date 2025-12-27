
import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) { }

  async createMessage(createMessageDto: CreateMessageDto, senderId: string) {
    // 1. Ensure conversation exists
    let conversation = await this.prisma.conversation.findFirst({
      where: {
        OR: [
          { hostId: senderId, participantId: createMessageDto.recipientId },
          { hostId: createMessageDto.recipientId, participantId: senderId }
        ]
      }
    });

    if (!conversation) {
      conversation = await this.prisma.conversation.create({
        data: {
          hostId: senderId,
          participantId: createMessageDto.recipientId
        }
      });
    }

    // 2. Create Message
    return this.prisma.message.create({
      data: {
        conversationId: conversation.id,
        senderId,
        content: createMessageDto.content
      },
      include: { conversation: true }
    });
  }

  async getConversations(userId: string) {
    return this.prisma.conversation.findMany({
      where: {
        OR: [
          { hostId: userId },
          { participantId: userId }
        ]
      },
      include: {
        host: { include: { profile: true } },
        participant: { include: { profile: true } },
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' }
        }
      }
    });
  }

  async getMessages(conversationId: string, userId: string) {
    // Security: Check if user is part of conversation
    const conv = await this.prisma.conversation.findUnique({ where: { id: conversationId } });
    if (!conv || (conv.hostId !== userId && conv.participantId !== userId)) {
      throw new Error("Unauthorized");
    }

    return this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' }
    });
  }
  async createConversation(recipientId: string, senderId: string) {
    let conversation = await this.prisma.conversation.findFirst({
      where: {
        OR: [
          { hostId: senderId, participantId: recipientId },
          { hostId: recipientId, participantId: senderId }
        ]
      }
    });

    if (!conversation) {
      conversation = await this.prisma.conversation.create({
        data: {
          hostId: senderId,
          participantId: recipientId
        }
      });
    }
    return conversation;
  }
}
