import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { Types } from 'mongoose';
import { BuildingTypeEnum } from 'src/catalogs/building-type.enum';

export class CatalogResponseDto {
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
  size: number;

  @Expose()
  @Transform(({ value }) => value.toString())
  type: BuildingTypeEnum;
}
