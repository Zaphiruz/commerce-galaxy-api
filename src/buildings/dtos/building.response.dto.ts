import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { Types } from "mongoose";

import { BuildingTypeEnum } from "../building-type.enum";

export class BuildingResponseDto {
    @Expose()
    @Transform(({ value }) => value.toString())
    @ApiProperty({ type: String })
    _id: Types.ObjectId;

    @Expose()
    name: string;

    @Expose()
    size: number;

    @Expose()
    @Transform(({ value }) => value.toString())
    type: BuildingTypeEnum;
}