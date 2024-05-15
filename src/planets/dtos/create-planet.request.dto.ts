import { IsOptional } from 'class-validator';

export class CreatePlanetRequestDto {
  @IsOptional()
  name?: string;
}
