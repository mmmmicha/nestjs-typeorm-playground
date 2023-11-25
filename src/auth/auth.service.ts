import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { User } from '../domain/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repository/user.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async validateUser(user: LoginDTO): Promise<{ accessToken: string } | undefined> {
        let existedUser = await this.userRepository.findOne({ where : { username : user.username }});
        if (!existedUser) throw new UnauthorizedException('user not found');

        const isPasswordMatching = await bcrypt.compare(user.password, existedUser.password);
        if (!isPasswordMatching) throw new UnauthorizedException('wrong password');

        this.convertInRoles(existedUser);
        const payload: Payload = {
            username: existedUser.username,
            id: existedUser.id,
            roles: existedUser.roles,
        };

        const accessToken = await this.createAccessToken(payload);

        return {
            accessToken: accessToken,
        };
    }

    private async createAccessToken(payload: Payload): Promise<string> {
        const accesshToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('access_token_secret'),
            expiresIn: "30m",
        });

        return accesshToken;
    }

    async tokenValidateUser(payload: Payload): Promise<User | undefined> {
        let existedUser = await this.userRepository.findOne({ where : { id : payload.id }});
        this.flatRoles(existedUser);
        return existedUser;
    }

    private convertInRoles(user: any): User {
        if (user && user.roles) {
            user.roles = user.roles.map((role: any) => { name: role.roleName });
        }
        return user;
    }

    private flatRoles(user: any): User {
        if (user && user.roles) {
            user.roles = user.roles.map((role: any) => role.roleName);
        }
        return user;
    }
}
