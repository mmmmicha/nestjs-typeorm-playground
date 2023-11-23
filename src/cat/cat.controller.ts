import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CatService } from './cat.service';
import { Cat } from '../domain/cat.entity';
import { AuthGuard } from 'src/auth/security/auth.guard';

@Controller('cat')
@UseGuards(AuthGuard)
export class CatController {
    constructor(private readonly catService: CatService){}

    @Get()
    findAll(): Promise<Cat[]> {
        return this.catService.findAll();
    }

    @Get(':id')
    findOne(@Param('id')id: number): Promise<Cat> {
        return this.catService.findOne(id);
    }

    @Post()
    create(@Body() cat: Cat): Promise<void> {
        return this.catService.create(cat);
    }

    @Delete(':id')
    delete(@Param('id')id: number): Promise<void> {
        return this.catService.delete(id);
    }

    @Put(':id')
    update(@Param('id')id: number, @Body() cat: Cat): Promise<void> {
        return this.catService.update(id, cat);
    }
}
