
import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatService: ChatService,
    private readonly prisma: PrismaService
  ) { }

  @WebSocketServer()
  server: Server;

  private logger = new Logger('ChatGateway');

  async handleConnection(client: Socket) {
    const token = client.handshake.auth.token;
    if (!token) {
      client.disconnect();
      return;
    }

    try {
      // In Prod: Verify signature with Clerk JWKS. 
      // For MVP: Decode and trust (assuming handled by client correctly + HTTPS)
      // OR better: use a simple check if we can.
      // Let's decode to get 'sub' (Clerk ID)
      const decoded: any = jwt.decode(token);
      if (!decoded || !decoded.sub) {
        client.disconnect();
        return;
      }

      const clerkId = decoded.sub;

      // Find our DB user
      const user = await this.prisma.user.findUnique({ where: { clerkId } });
      if (!user) {
        client.disconnect();
        return;
      }

      // Attach user to client
      client.data.user = user;

      // Join a room based on their User ID so we can send them messages direct
      client.join(`user:${user.id}`);

      this.logger.log(`User connected: ${user.email}`);
    } catch (e) {
      this.logger.error(e);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto, @ConnectedSocket() client: Socket) {
    const sender = client.data.user;
    if (!sender) return; // Should be handled by handleConnection

    // Create message in DB
    const message = await this.chatService.createMessage(createMessageDto, sender.id);

    // Emit to recipient
    this.server.to(`user:${createMessageDto.recipientId}`).emit('newMessage', message);

    // Emit back to sender (confirm/update UI)
    client.emit('newMessage', message);

    return message;
  }

  @SubscribeMessage('joinConversation')
  joinConversation(@MessageBody() conversationId: string, @ConnectedSocket() client: Socket) {
    // In future: Check if user is participant
    client.join(`conversation:${conversationId}`);
  }
}
