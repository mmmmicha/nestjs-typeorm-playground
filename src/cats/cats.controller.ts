import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from '../domain/cats.entity';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService){}

    @Get()
    findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id')id: number): Promise<Cat> {
        return this.catsService.findOne(id);
    }

    @Post()
    create(@Body() cat: Cat): Promise<void> {
        return this.catsService.create(cat);
    }

    @Delete(':id')
    delete(@Param('id')id: number): Promise<void> {
        return this.catsService.delete(id);
    }

    @Put(':id')
    update(@Param('id')id: number, @Body() cat: Cat): Promise<void> {
        return this.catsService.update(id, cat);
    }
}
