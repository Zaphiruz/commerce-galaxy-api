import { IsEnum, IsOptional } from 'class-validator';

import { BuildingTypeEnum } from '../building-type.enum';

export class UpdateBuildingRequestDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  size?: number;

  @IsOptional()
  @IsEnum(BuildingTypeEnum)
  type?: BuildingTypeEnum;
}
