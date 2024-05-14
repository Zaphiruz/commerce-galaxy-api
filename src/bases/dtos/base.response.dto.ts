import { Expose, Transform, Type } from "class-transformer";
import { Types } from "mongoose";

import { UserResponseDto } from "../../users/dtos/user.response.dto";
import { PlanetResponseDto } from "src/planets/dtos/planet.response.dto";


export class BaseResponseDto {
    @Transform(({ value }) => value.toString())
    @Expose()
    _id: Types.ObjectId;

    @Expose()
    name: string;

    @Expose()
    size: number;

    @Expose()
    @Type(() => PlanetResponseDto)
    planet: PlanetResponseDto;

    @Expose()
    @Type(() => UserResponseDto)
    user: UserResponseDto;
}