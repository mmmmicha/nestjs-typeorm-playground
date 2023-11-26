import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from '../domain/cat.entity';
import { PostCatDTO } from './dto/postCat.dto';
import { PutCatDTO } from './dto/putCat.dto';
import { CatRepository } from 'src/repository/cat.repository';

@Injectable()
export class CatService {
    constructor(
        @InjectRepository(CatRepository) private readonly catRepository: CatRepository
    ) {}

    async findAll(): Promise<Cat[]> {
        return await this.catRepository.find();
    }

    async findOne(id: number): Promise<Cat> {
        return await this.catRepository.findOne({ where: { id } });
    }

    async create(postCatDTO: PostCatDTO): Promise<Cat> {
        return await this.catRepository.save(postCatDTO);
    }

    async delete(id: number): Promise<void> {
        await this.catRepository.delete(id);
    }

    async update(id: number, putCatDTO: PutCatDTO): Promise<void> {
        const exsitedCat = await this.catRepository.findOne({ where: { id } });
        if (!exsitedCat)
            throw new NotFoundException('cat not found');

        await this.catRepository.update(id, putCatDTO);
    }
}
