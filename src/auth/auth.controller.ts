import { Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { AuthGuard } from './security/auth.guard';
import { RolesGuard } from './security/roles.guard';
import { Roles } from './decorator/role.decorator';
import { RoleType } from './role-type';

@Controller('api')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    @UsePipes(ValidationPipe)
    registerNewUser(@Body() userDTO: UserDTO): Promise<any> {
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

    @Get('/admin-role')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN)
    adminRoles(@Req() req: Request): any {
        return req.user;
    }
}
