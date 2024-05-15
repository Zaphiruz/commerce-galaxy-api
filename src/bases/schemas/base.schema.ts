import { ApiProperty } from '@nestjs/swagger';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Planet } from 'src/planets/schemas/planet.schema';
import { User } from 'src/users/schemas/user.schema';

export type BaseDocument = HydratedDocument<Base>;

@Schema()
export class Base {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ required: true, default: 25 })
  size: number;

  @Prop({ type: Types.ObjectId, ref: 'Planet', required: true })
  @ApiProperty({ type: String })
  planet: Planet;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  @ApiProperty({ type: String })
  user: User;

  constructor(base?: Partial<Base>) {
    Object.assign(this, base);
  }
}

export const BaseSchema = SchemaFactory.createForClass(Base);
