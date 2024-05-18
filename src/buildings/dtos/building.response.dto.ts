import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { Types } from 'mongoose';

import { BaseResponseDto } from 'src/bases/dtos/base.response.dto';
import { CatalogResponseDto } from 'src/catalogs/dtos/catalog.response.dto';
import { ResourceResponseDto } from 'src/resources/dtos/resource.response.dto';

export class BuildingResponseDto {
	@Expose()
	@Transform(({ value }) => value.toString())
	@Type((type) =>
		Types.ObjectId.bind(null, type.object[type.property].toString()),
	)
	@ApiProperty({ type: String })
	_id: Types.ObjectId;

	@Expose()
	@Type(() => CatalogResponseDto)
	catalog: CatalogResponseDto;

	@Expose()
	@Type(() => BaseResponseDto)
	base: BaseResponseDto;

	@ApiProperty({ type: Date })
	startTime: Date;

	@ApiProperty({ type: String })
	@Type(() => ResourceResponseDto)
	producing: string;

	@ApiProperty({ type: [String] })
	@Type(() => ResourceResponseDto)
	queue: string[];
}
