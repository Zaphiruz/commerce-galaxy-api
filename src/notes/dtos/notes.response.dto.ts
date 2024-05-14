import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform, Type } from "class-transformer";
import { Types } from "mongoose";

export class NoteResponseDto {
    @Expose()
    @Transform(({ value }) => value.toString())
    @Type((type) => Types.ObjectId.bind(null, type.object[type.property].toString()))
    @ApiProperty({ type: String })
    _id: Types.ObjectId;

    @Expose()
    name: string;
}