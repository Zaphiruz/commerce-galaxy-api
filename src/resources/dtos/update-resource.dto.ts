import { IsEnum, IsOptional } from "class-validator";

import { ResourceTypeEnum } from "src/enums/resource-type.enum";

export class UpdateResourceDto {
    @IsOptional()
    name?: string;

    @IsOptional()
    symbol?: string;

    @IsOptional()
    @IsEnum(ResourceTypeEnum)
    type?: ResourceTypeEnum;
}