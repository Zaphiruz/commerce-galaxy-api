import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";

import { ResourceTypeEnum } from "src/resources/resource-type.enum";

export class NewResourceDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    symbol: string;

    @IsEnum(ResourceTypeEnum)
    type: ResourceTypeEnum;
}