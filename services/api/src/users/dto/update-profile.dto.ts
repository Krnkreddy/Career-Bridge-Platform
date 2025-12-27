
import { IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    fullName?: string;

    @IsOptional()
    @IsString()
    bio?: string;

    @IsOptional()
    @IsString()
    resumeUrl?: string;

    @IsOptional()
    @IsArray()
    skills?: string[]; // Simplified for MVP
}
