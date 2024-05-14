import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { Types } from "mongoose";

export class WorkerResponseDto {
    @Expose()
    @Transform(({ value }) => value.toString())
    @ApiProperty({ type: String })
    _id: Types.ObjectId;

    @Expose()
    name: string;
}