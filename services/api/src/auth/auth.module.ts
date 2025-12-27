
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClerkStrategy } from './clerk.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'clerk' }),
    ConfigModule,
  ],
  providers: [AuthService, ClerkStrategy],
  exports: [AuthService, PassportModule],
})
export class AuthModule { }
