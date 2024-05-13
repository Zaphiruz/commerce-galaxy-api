import { IsEnum, IsOptional } from "class-validator";

import { BuildingTypeEnum } from "../building-type.enum";

export class UpdateBuildingDto {
    @IsOptional()
    name?: string;

    @IsOptional()
    size?: number;

    @IsOptional()
    @IsEnum(BuildingTypeEnum)
    type?: BuildingTypeEnum;
}