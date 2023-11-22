import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { UserAuthority } from "../domain/user-authority.entity";

@Injectable()
export class UserAuthorityRepository extends Repository<UserAuthority> {
    constructor(dataSource: DataSource) {
        super(UserAuthority, dataSource.createEntityManager());
    }
}