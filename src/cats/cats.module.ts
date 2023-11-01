import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsSchema, Cats } from './model/cats.model';
import { Cat } from 'src/domain/cats.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cats.name, schema: CatsSchema }]), TypeOrmModule.forFeature([Cat])],
  exports: [TypeOrmModule],
  controllers: [CatsController],
  providers: [CatsService]
})
export class CatsModule {}
