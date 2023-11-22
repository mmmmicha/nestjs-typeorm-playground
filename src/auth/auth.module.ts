import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './security/passport.jwt.strategy';
import { UserAuthorityRepository } from '../repository/user-authority.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, UserAuthorityRepository]),
        JwtModule.register({
            secret: 'secret',
            // 30 minutes
            signOptions: { expiresIn: '30m' },
        }),
        PassportModule
      ],
    exports: [TypeOrmModule],
    controllers: [AuthController],
    providers: [AuthService, UserRepository, UserAuthorityRepository, JwtStrategy]
})
export class AuthModule {}
