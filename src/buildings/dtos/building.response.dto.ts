import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { Types } from 'mongoose';

import { BaseResponseDto } from 'src/bases/dtos/base.response.dto';
import { CatalogResponseDto } from 'src/catalogs/dtos/catalog.response.dto';
import { RecipeResponseDto } from 'src/recipes/dtos/recipe.response.dto';

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

	@Expose()
	@ApiProperty({ type: Date })
	createdTime: Date;

	@Expose()
	@ApiProperty({ type: Date })
	startTime: Date;

	@Expose()
	@Type(() => RecipeResponseDto)
	producing: RecipeResponseDto;

	@Expose()
	@Type(() => RecipeResponseDto)
	queue: RecipeResponseDto[];
}
