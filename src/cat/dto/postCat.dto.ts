import { IsBoolean, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class PostCatDTO {
    @IsString()
    @IsNotEmpty()
    @Min(1)
    @Max(20)
    name: string;

    @IsNumber()
    @IsNotEmpty()
    age: number;

    @IsString()
    @IsNotEmpty()
    breed: string;

    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;
}