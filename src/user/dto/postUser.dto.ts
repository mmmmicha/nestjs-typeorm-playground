import { IsNotEmpty, IsString, Max, Min } from "class-validator";

export class PostUserDTO {
    @IsNotEmpty()
    @IsString()
    @Min(8)
    @Max(20)
    username: string;

    @IsNotEmpty()
    @IsString()
    @Min(8)
    @Max(20)
    password: string;
}