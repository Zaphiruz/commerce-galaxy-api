import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BuildingTypeEnum } from 'src/buildings/building-type.enum';

export type CatalogDocument = HydratedDocument<Catalog>;

@Schema()
export class Catalog {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  type: BuildingTypeEnum;

  constructor(catalog?: Partial<Catalog>) {
    Object.assign(this, catalog);
  }
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);
