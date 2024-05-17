import { IsMongoId, IsOptional } from 'class-validator';
import { Catalog } from 'src/catalogs/schemas/catalog.schema';

export class UpdateBuildingRequestDto {
	@IsOptional()
	@IsMongoId()
	catalog?: string | Catalog;
}
