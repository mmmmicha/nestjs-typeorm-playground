import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { FindOneOptions } from "typeorm";
import { UserDTO } from "./dto/user.dto";
import * as bcrypt from 'bcrypt';
import { User } from "./entity/user.entity";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

    async findByFields(options: FindOneOptions<User>): Promise<User | undefined> {
        return await this.userRepository.findOne(options);
    }

    async save(userDTO: UserDTO): Promise<UserDTO | undefined> {
        await this.transformPassword(userDTO);
        return await this.userRepository.save(userDTO);
    }

    async transformPassword(userDTO: UserDTO): Promise<void> {
        userDTO.password = await bcrypt.hash(userDTO.password, 10);
        return Promise.resolve();
    }
}