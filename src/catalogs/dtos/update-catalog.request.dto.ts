import { IsEnum, IsOptional } from 'class-validator';
import { BuildingTypeEnum } from 'src/catalogs/building-type.enum';

export class UpdateCatalogRequestDto {
	@IsOptional()
	name?: string;

	@IsOptional()
	size?: number;

	@IsOptional()
	@IsEnum(BuildingTypeEnum)
	type?: BuildingTypeEnum;
}
