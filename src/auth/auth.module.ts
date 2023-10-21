import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './security/passport.jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        JwtModule.register({
            secret: 'secret',
            // 30 minutes
            signOptions: { expiresIn: 1800 },
        }),
        PassportModule
      ],
    exports: [TypeOrmModule],
    controllers: [AuthController],
    providers: [AuthService, UserService, UserRepository, JwtStrategy]
})
export class AuthModule {}
