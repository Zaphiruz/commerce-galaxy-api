import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { Types } from 'mongoose';
import { ResourceTypeEnum } from '../resource-type.enum';

export class RecipeResponseDto {
  @Expose()
  @Transform(({ value }) => value.toString())
  @Type((type) =>
    Types.ObjectId.bind(null, type.object[type.property].toString()),
  )
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  symbol: string;

  @Expose()
  time: number;

  @Expose()
  amount: number;

  @Expose()
  @Transform(({ value }) => value.toString())
  type: ResourceTypeEnum;
}
