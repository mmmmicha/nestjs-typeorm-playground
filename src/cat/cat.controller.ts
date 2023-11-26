import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { CatService } from './cat.service';
import { AuthGuard } from 'src/auth/security/auth.guard';
import { Response } from 'express';
import { PostCatDTO } from './dto/postCat.dto';
import { PutCatDTO } from './dto/putCat.dto';

@Controller('cat')
@UseGuards(AuthGuard)
export class CatController {
    constructor(private readonly catService: CatService){}

    @Get()
    async findAll(@Res() res: Response): Promise<any> {
        const payload = await this.catService.findAll();
        return res.send({ message: 'ok', payload: payload });
    }

    @Get(':id')
    async findOne(@Param('id')id: number, @Res() res: Response): Promise<any> {
        const payload = await this.catService.findOne(id);
        return res.send({ message: 'ok', payload: payload });
    }

    @Post()
    async create(@Body() postCatDTO: PostCatDTO, @Res() res: Response): Promise<any> {
        const payload = await this.catService.create(postCatDTO);
        return res.send({ message: 'ok', payload: payload });
    }

    @Delete(':id')
    async delete(@Param('id')id: number, @Res() res: Response): Promise<any> {
        await this.catService.delete(id);
        return res.send({ message: 'ok' });
    }

    @Put(':id')
    async update(@Param('id')id: number, @Body() putCatDTO: PutCatDTO, @Res() res: Response): Promise<any> {
        await this.catService.update(id, putCatDTO);
        return res.send({ message: 'ok' });
    }
}
