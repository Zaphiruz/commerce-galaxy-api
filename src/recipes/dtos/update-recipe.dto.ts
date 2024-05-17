import { IsEnum, IsOptional, IsMongoId } from 'class-validator';
import { ResourceTypeEnum } from '../resource-type.enum';

export class UpdateRecipeDto {
	@IsOptional()
	name?: string;

	@IsOptional()
	symbol?: string;

	@IsOptional()
	time?: number;

	@IsOptional()
	amount?: number;

	@IsEnum(ResourceTypeEnum)
	type?: ResourceTypeEnum;

	@IsMongoId()
	resource: string;

	@IsMongoId()
	catalog: string;
}
