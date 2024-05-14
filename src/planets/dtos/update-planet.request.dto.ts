import { IsOptional } from "class-validator";

export class UpdatePlanetRequestDto {
    @IsOptional()
    name?: string;
}