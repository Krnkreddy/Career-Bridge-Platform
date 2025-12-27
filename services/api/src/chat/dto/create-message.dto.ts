
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateMessageDto {
    @IsNotEmpty()
    @IsString()
    recipientId: string; // The user ID of the receiver (our DB UUID, not Clerk ID, or resolve it) -> Let's use our DB UUID for internal consistency

    @IsNotEmpty()
    @IsString()
    content: string;
}
