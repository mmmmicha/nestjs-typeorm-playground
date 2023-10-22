import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { User } from '../domain/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async registerNewUser(userDTO: UserDTO): Promise<UserDTO | undefined> {
        let existedUser = await this.userService.findByFields({ where : { username : userDTO.username }});
        if (existedUser) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        return await this.userService.save(userDTO);
    }

    async validateUser(user: UserDTO): Promise<{ accessToken: string } | undefined> {
        let existedUser = await this.userService.findByFields({ where : { username : user.username }});
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
        let existedUser = await this.userService.findByFields({ where : { id : payload.id }});
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
