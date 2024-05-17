import { IsEnum, IsNotEmpty } from 'class-validator';

import { BuildingTypeEnum } from 'src/catalogs/building-type.enum';

export class NewCatalogDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  size: number;

  @IsEnum(BuildingTypeEnum)
  type: BuildingTypeEnum;
}
