import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
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

    async registerNewUser(loginDTO: LoginDTO): Promise<LoginDTO | undefined> {
        let existedUser = await this.userRepository.findOne({ where : { username : loginDTO.username }});
        if (existedUser) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        return await this.userRepository.save(loginDTO);
    }

    async validateUser(user: LoginDTO): Promise<{ accessToken: string } | undefined> {
        let existedUser = await this.userRepository.findOne({ where : { username : user.username }});
        if (!existedUser) throw new UnauthorizedException();

        const isPasswordMatching = await bcrypt.compare(user.password, existedUser.password);
        if (!isPasswordMatching) throw new UnauthorizedException();

        this.convertInAuthorities(existedUser);
        const payload: Payload = {
            username: existedUser.username,
            id: existedUser.id,
            authorities: existedUser.authorities,
        };

        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async tokenValidateUser(payload: Payload): Promise<User | undefined> {
        let existedUser = await this.userRepository.findOne({ where : { id : payload.id }});
        this.flatAuthorities(existedUser);
        return existedUser;
    }

    private convertInAuthorities(user: any): User {
        if (user && user.authorities) {
            user.authorities = user.authorities.map((authority: any) => { name: authority.authorityName });
        }
        return user;
    }

    private flatAuthorities(user: any): User {
        if (user && user.authorities) {
            user.authorities = user.authorities.map((authority: any) => authority.authorityName);
        }
        return user;
    }
}
