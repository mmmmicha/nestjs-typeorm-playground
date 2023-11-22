import { Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from './security/auth.guard';
import { RolesGuard } from './security/roles.guard';
import { Roles } from './decorator/role.decorator';
import { RoleType } from './role-type';

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

    @Get('/authenticate')
    @UseGuards(AuthGuard)
    async authenticate(@Req() req: Request): Promise<any> {
        return req.user;
    }

    @Get('/admin-role')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN)
    adminRoles(@Req() req: Request): any {
        return req.user;
    }

    @Get('/cookies')
    getCookies(@Req() req: Request, @Res() res: Response): any {
        const jwt = req.cookies['jwt']
        return res.send(jwt);
    }

    @Post('/logout')
    logout(@Res() res: Response): any {
        res.cookie('jwt', '', {
            maxAge: 0
        });
        return res.send({
            message: 'success'
        });
    }
}
