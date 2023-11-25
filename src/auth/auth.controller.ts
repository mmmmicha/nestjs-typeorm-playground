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
        const tokenPair = await this.authService.validateUser(loginDTO);
        res.cookie('accessToken', tokenPair.accessToken, { httpOnly: true });
        return res.send({ message: 'ok', payload: { accessToken: tokenPair.accessToken } });
    }

    @Post('/logout')
    @UseGuards(AuthGuard)
    async logout(@Res() res: Response): Promise<any> {
        res.cookie('accessToken', '', { httpOnly: true });
        return res.send({ message: 'ok' });
    }
}
