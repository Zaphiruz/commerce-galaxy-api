import { IsEnum, IsNotEmpty } from 'class-validator';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema()
export class Recipe {
    @IsNotEmpty()
    @Prop()
    name: string;

    @IsNotEmpty()
    @Prop()
    symbol: string;

    constructor(recipe?: Partial<Recipe>) {
        Object.assign(this, recipe)
    }
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);