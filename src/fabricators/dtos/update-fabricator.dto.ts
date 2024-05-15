import { IsOptional } from 'class-validator';

export class UpdateFabricatorDto {
  @IsOptional()
  name?: string;
}
