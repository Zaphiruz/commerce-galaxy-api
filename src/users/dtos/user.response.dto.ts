import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { Types } from 'mongoose';
import { UserRolesEnum } from '../user-roles.enum';

export class UserResponseDto {
  @Expose()
  @Transform(({ value }) => value.toString())
  @Type((type) =>
    Types.ObjectId.bind(null, type.object[type.property].toString()),
  )
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @Expose()
  username: string;

  @Expose()
  @Transform(({ value }) => value.map((role) => role.toString()))
  @ApiProperty({ type: [String] })
  roles: UserRolesEnum[];
}
