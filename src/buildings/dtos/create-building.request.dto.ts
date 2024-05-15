import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';

import { BuildingTypeEnum } from '../building-type.enum';

export class CreateBuildingRequestDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  size: number;

  @IsEnum(BuildingTypeEnum)
  type: BuildingTypeEnum;

  @IsMongoId()
  base: string;
}
