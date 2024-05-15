import { Expose, Transform, Type } from 'class-transformer';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { UserResponseDto } from '../../users/dtos/user.response.dto';
import { PlanetResponseDto } from 'src/planets/dtos/planet.response.dto';

export class BaseResponseDto {
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
  @Type(() => PlanetResponseDto)
  planet: PlanetResponseDto;

  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;
}
