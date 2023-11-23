import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { User } from '../domain/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        private jwtService: JwtService
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

        return {
            accessToken: this.jwtService.sign(payload),
        };
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
