import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../repository/user.repository";
import * as bcrypt from 'bcrypt';
import { PostUserDTO } from "./dto/postUser.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

    async register(userDTO: PostUserDTO): Promise<PostUserDTO | undefined> {
        userDTO.password = await this.transformPassword(userDTO?.password);
        return await this.userRepository.save(userDTO);
    }

    private async transformPassword(password: string): Promise<string> {
        password = await bcrypt.hash(password, 10);
        return password;
    }
}