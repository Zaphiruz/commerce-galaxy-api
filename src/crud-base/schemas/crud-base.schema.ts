import { Schema } from '@nestjs/mongoose';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Types } from 'mongoose';

@Schema()
export class CrudBase {
	@Exclude()
	@ApiHideProperty()
	_id: Types.ObjectId;

	@Exclude()
	@ApiHideProperty()
	__v: number;
}
