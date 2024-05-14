import { IsMongoId, IsOptional, IsPositive } from "class-validator";


export class CreateBaseRequestDto {
    @IsOptional()
    name?: string;
    
    @IsPositive()
    size: number = 25;

    @IsMongoId()
    planet: string;

    @IsMongoId()
    user: string;
}