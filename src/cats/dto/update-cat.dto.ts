
import { IsNumber,  IsOptional,  IsPositive, IsString, MinLength } from 'class-validator';

export class UpdateCatDto {
    @IsString()
    @MinLength(1)
    @IsOptional()
    name: string;
    
    @IsNumber()
    @IsPositive()
    @IsOptional()
    age: number;

    @IsString()
    @IsOptional()
    breed?: string;

    @IsNumber()
    @IsOptional()
    breedId?: number;

}
