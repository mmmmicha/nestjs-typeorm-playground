import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Cat } from "src/domain/cat.entity";

@Injectable()
export class CatRepository extends Repository<Cat> {
    constructor(dataSource: DataSource) {
        super(Cat, dataSource.createEntityManager());
    }
}