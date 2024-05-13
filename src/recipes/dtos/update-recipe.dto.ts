import { IsOptional } from "class-validator";

export class UpdateRecipeDto {
    @IsOptional()
    name?: string;

    @IsOptional()
    symbol?: string;
}