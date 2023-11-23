import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatRepository } from 'src/repository/cat.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CatRepository])],
  exports: [TypeOrmModule],
  controllers: [CatController],
  providers: [CatService, CatRepository]
})
export class CatModule {}
