import { IsEnum, IsOptional } from 'class-validator';
import { BuildingTypeEnum } from 'src/buildings/building-type.enum';

export class UpdateCatalogDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  size?: number;

  @IsOptional()
  @IsEnum(BuildingTypeEnum)
  type?: BuildingTypeEnum;
}
