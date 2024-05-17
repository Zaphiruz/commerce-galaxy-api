import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { Types } from 'mongoose';
import { ResourceTypeEnum } from '../resource-type.enum';
import { ResourceResponseDto } from 'src/resources/dtos/resource.response.dto';
import { CatalogResponseDto } from 'src/catalogs/dtos/catalog.response.dto';

export class RecipeResponseDto {
	@Expose()
	@Transform(({ value }) => value.toString())
	@Type((type) =>
		Types.ObjectId.bind(null, type.object[type.property].toString()),
	)
	@ApiProperty({ type: String })
	_id: Types.ObjectId;

	@Expose()
	name: string;

	@Expose()
	symbol: string;

	@Expose()
	time: number;

	@Expose()
	amount: number;

	@Expose()
	@Transform(({ value }) => value.toString())
	type: ResourceTypeEnum;

	@Expose()
	@Type(() => ResourceResponseDto)
	resource: ResourceResponseDto;

	@Expose()
	@Type(() => CatalogResponseDto)
	catalog: CatalogResponseDto;
}
