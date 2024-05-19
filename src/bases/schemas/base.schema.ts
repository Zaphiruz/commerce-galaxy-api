import { ApiProperty } from '@nestjs/swagger';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Planet } from 'src/planets/schemas/planet.schema';
import { User } from 'src/users/schemas/user.schema';
import { Building } from 'src/buildings/schemas/building.schema';
import { Storage } from 'src/storages/schemas/storage.schema';

export type BaseDocument = HydratedDocument<Base>;

@Schema()
export class Base {
	@ApiProperty({ type: String })
	_id: Types.ObjectId;

	@Prop()
	name: string;

	@Prop({ required: true, default: 25 })
	size: number;

	@Prop({ type: Types.ObjectId, ref: Planet.name, required: true })
	@ApiProperty({ type: String })
	planet: Planet | string;

	@Prop({ type: Types.ObjectId, ref: User.name, required: true })
	@ApiProperty({ type: String })
	user: User | string;

	@Prop({ type: [Types.ObjectId], ref: Building.name, default: [] })
	@ApiProperty({ type: [String] })
	buildings: Building[] | string[];

	@Prop({ type: Types.ObjectId, ref: Storage.name, required: true })
	@ApiProperty({ type: String })
	storage: Storage | string;

	constructor(base?: Partial<Base>) {
		Object.assign(this, base);
	}
}

export const BaseSchema = SchemaFactory.createForClass(Base);
