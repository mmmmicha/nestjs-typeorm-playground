import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './security/passport.jwt.strategy';
import { RoleRepository } from '../repository/role.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, RoleRepository]),
        JwtModule.register({
            secret: 'secret',
            // 30 minutes
            signOptions: { expiresIn: '30m' },
        }),
        PassportModule
      ],
    exports: [TypeOrmModule],
    controllers: [AuthController],
    providers: [AuthService, UserRepository, RoleRepository, JwtStrategy]
})
export class AuthModule {}
