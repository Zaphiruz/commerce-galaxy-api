import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema()
export class Recipe {
    @ApiProperty({ type: String })
    _id: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    symbol: string;

    constructor(recipe?: Partial<Recipe>) {
        Object.assign(this, recipe)
    }
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);