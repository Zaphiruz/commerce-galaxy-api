import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Base } from 'src/bases/schemas/base.schema';
import { Catalog } from 'src/catalogs/schemas/catalog.schema';

export type BuildingDocument = HydratedDocument<Building>;

@Schema()
export class Building {
	@ApiProperty({ type: String })
	_id: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: 'Catalog', required: true })
	@ApiProperty({ type: String })
	catalog: Catalog | string;

	@Prop({ type: Types.ObjectId, ref: 'Base', required: true })
	@ApiProperty({ type: String })
	base: Base | string;

	constructor(building?: Partial<Building>) {
		Object.assign(this, building);
	}
}

export const BuildingSchema = SchemaFactory.createForClass(Building);
