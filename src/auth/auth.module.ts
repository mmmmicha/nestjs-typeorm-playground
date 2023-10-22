import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './security/passport.jwt.strategy';
import { UserAuthorityRepository } from './repository/user-authority.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, UserAuthorityRepository]),
        JwtModule.register({
            secret: 'secret',
            // 30 minutes
            signOptions: { expiresIn: 1800 },
        }),
        PassportModule
      ],
    exports: [TypeOrmModule],
    controllers: [AuthController],
    providers: [AuthService, UserService, UserRepository, UserAuthorityRepository, JwtStrategy]
})
export class AuthModule {}
