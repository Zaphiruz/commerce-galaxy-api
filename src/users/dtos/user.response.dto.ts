import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { Types } from "mongoose";

export class UserResponseDto {
    @Expose()
    @Transform(({ value }) => value.toString())
    @ApiProperty({ type: String })
    _id: Types.ObjectId;

    @Expose()
    username: string;

    @Expose()
    isAdmin: Boolean = false;
}