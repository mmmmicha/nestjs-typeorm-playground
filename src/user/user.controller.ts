import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Post, UsePipes, ValidationPipe, Body } from '@nestjs/common'
import { PostUserDTO } from './dto/postUser.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UsePipes(ValidationPipe)
    registerNewUser(@Body() userDTO: PostUserDTO): Promise<any> {
        return this.userService.register(userDTO);
    }
}
