import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { User } from './entity/user.entity';
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

        const payload: Payload = {
            username: existedUser.username,
            id: existedUser.id,
        };


        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async tokenValidateUser(payload: Payload): Promise<User | undefined> {
        return await this.userService.findByFields({ where : { id : payload.id }});
    }
}
