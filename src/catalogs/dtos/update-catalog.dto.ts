import { IsEnum, IsOptional } from 'class-validator';
import { BuildingTypeEnum } from 'src/catalogs/building-type.enum';

export class UpdateCatalogDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  size?: number;

  @IsOptional()
  @IsEnum(BuildingTypeEnum)
  type?: BuildingTypeEnum;
}
