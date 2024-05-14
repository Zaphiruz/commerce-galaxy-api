import { Expose, Transform } from "class-transformer";
import { Types } from "mongoose";


export class PlanetResponseDto {
    @Transform(({ value }) => value.toString())
    @Expose()
    _id: Types.ObjectId;

    @Expose()
    name: string;
}