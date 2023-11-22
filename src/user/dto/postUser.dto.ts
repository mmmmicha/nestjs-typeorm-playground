import { IsNotEmpty } from "class-validator";

export class PostUserDTO {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}