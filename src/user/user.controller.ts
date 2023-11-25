import { Controller, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Post, UsePipes, ValidationPipe, Body } from '@nestjs/common'
import { PostUserDTO } from './dto/postUser.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async registerNewUser(@Body() userDTO: PostUserDTO, @Res() res: Response): Promise<any> {
        const payload = await this.userService.register(userDTO);
        return res.send({ message: 'ok', payload: payload});
    }
}
