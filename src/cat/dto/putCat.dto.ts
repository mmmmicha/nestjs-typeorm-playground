import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class PutCatDTO {
    @IsString()
    @Min(1)
    @Max(20)
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