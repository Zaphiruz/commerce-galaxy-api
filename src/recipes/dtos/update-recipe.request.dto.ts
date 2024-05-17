import { IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { ResourceTypeEnum } from '../resource-type.enum';

export class UpdateRecipeRequestDto {
	@IsOptional()
	name?: string;

	@IsOptional()
	symbol?: string;

	@IsOptional()
	time?: number;

	@IsOptional()
	amount?: number;

	@IsOptional()
	@IsEnum(ResourceTypeEnum)
	type?: ResourceTypeEnum;

	@IsOptional()
	@IsMongoId()
	resource?: string;

	@IsOptional()
	@IsMongoId()
	catalog?: string;
}
