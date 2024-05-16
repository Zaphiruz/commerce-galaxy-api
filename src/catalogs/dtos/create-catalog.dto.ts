import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';

import { BuildingTypeEnum } from 'src/buildings/building-type.enum';

export class NewCatalogDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  size: number;

  @IsEnum(BuildingTypeEnum)
  type: BuildingTypeEnum;

  @IsMongoId()
  base: string;
}
