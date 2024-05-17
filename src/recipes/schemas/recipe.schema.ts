import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceTypeEnum } from '../resource-type.enum';
import { Resource } from 'src/resources/schemas/resource.schema';
import { Catalog } from 'src/catalogs/schemas/catalog.schema';

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

	@Prop({ type: Types.ObjectId, ref: 'Resource', required: true })
	@ApiProperty({ type: String })
	resource: Resource | string;

	@Prop({ type: Types.ObjectId, ref: 'Catalog', required: true })
	@ApiProperty({ type: String })
	catalog: Catalog | string;

	constructor(recipe?: Partial<Recipe>) {
		Object.assign(this, recipe);
	}
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
