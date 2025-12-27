
import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClerkStrategy extends PassportStrategy(Strategy, 'clerk') {
    private readonly logger = new Logger(ClerkStrategy.name);

    constructor(private readonly configService: ConfigService) {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${configService.get<string>('CLERK_ISSUER_URL')}/.well-known/jwks.json`,
            }),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            issuer: configService.get<string>('CLERK_ISSUER_URL'),
            algorithms: ['RS256'],
        });
    }

    async validate(payload: any) {
        this.logger.debug(`Validating user: ${payload.sub}`);
        // Return user object which will be injected into request
        return {
            userId: payload.sub,
            email: payload.email,
            role: payload.metadata?.role || 'STUDENT'
        };
    }
}
