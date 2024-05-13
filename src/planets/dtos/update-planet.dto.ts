import { IsOptional } from "class-validator";

export class UpdatePlanetDto {
    @IsOptional()
    name?: string;
}