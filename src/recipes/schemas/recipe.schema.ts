import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceTypeEnum } from '../resource-type.enum';

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema()
export class Recipe {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  symbol: string;

  @Prop({ required: true })
  time: number;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  type: ResourceTypeEnum;

  constructor(recipe?: Partial<Recipe>) {
    Object.assign(this, recipe);
  }
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
