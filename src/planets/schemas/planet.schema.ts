import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';

export type PlanetDocument = HydratedDocument<Planet>;

@Schema()
export class Planet {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @Prop()
  name: string;

  constructor(planet?: Partial<Planet>) {
    Object.assign(this, planet);
  }
}

export const PlanetSchema = SchemaFactory.createForClass(Planet);
