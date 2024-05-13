import { IsMongoId, IsOptional, IsPositive } from "class-validator";


export class UpdateBaseDto {
    @IsOptional()
    name?: string;

    @IsOptional()
    @IsPositive()
    size?: number;
}