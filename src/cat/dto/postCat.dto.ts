import { IsBoolean, IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";

export class PostCatDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(20)
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