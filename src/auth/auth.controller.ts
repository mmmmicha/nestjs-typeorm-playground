import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { AuthGuard } from './security/auth.guard';

@Controller('api')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    registerNewUser(@Req() req: Request, @Body() userDTO: UserDTO): Promise<any> {
        return this.authService.registerNewUser(userDTO);
    }

    @Post('/login')
    async login(@Body() userDTO: UserDTO, @Res() res: Response): Promise<any> {
        const jwt = await this.authService.validateUser(userDTO);
        res.header('Authorization', 'Bearer ' + jwt.accessToken);
        return res.json(jwt);
    }

    @Get('/authenticate')
    @UseGuards(AuthGuard)
    async authenticate(@Req() req: Request): Promise<any> {
        return req.user;
    }

}
