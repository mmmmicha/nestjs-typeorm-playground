import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class PutCatDTO {
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    @IsOptional()
    name: string;

    @IsNumber()
    @IsOptional()
    age: number;

    @IsString()
    @IsOptional()
    breed: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;
}