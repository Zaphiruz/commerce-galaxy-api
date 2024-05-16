import { IsOptional } from 'class-validator';

export class UpdateCatalogDto {
  @IsOptional()
  name?: string;
}
