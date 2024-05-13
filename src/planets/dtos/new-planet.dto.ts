import { IsOptional } from "class-validator";

export class NewPlanetDto {
    @IsOptional()
    name?: string;
}