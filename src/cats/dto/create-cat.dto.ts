import { IsString, IsNumber,  MinLength, IsPositive, IsOptional } from "class-validator";

export class CreateCatDto {    

    @IsString()
    @MinLength(1)
    name: string;
    
    @IsNumber()
    @IsPositive()
    age: number;

    @IsString()
    @IsOptional()
    breed?: string;

    @IsNumber()
    @IsOptional()
    breedId?: number;
}
