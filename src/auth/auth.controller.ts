import { Body, Controller, Post, Res, UseGuards, } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from './security/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    async login(@Body() loginDTO: LoginDTO, @Res() res: Response): Promise<any> {
        const jwt = await this.authService.validateUser(loginDTO);
        res.header('Authorization', 'Bearer ' + jwt.accessToken);
        res.cookie('jwt', jwt.accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        return res.send({
            message: 'success'
        });
    }

    @Post('/logout')
    @UseGuards(AuthGuard)
    async logout(@Res() res: Response): Promise<any> {
        res.cookie('jwt', '', {
            maxAge: 0
        });
        return res.send({
            message: 'success'
        });
    }
}
