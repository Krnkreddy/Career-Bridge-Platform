
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateApplicationDto {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    jobId: string;
}
