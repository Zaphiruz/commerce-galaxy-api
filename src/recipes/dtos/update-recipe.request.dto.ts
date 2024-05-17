import { IsEnum, IsOptional } from 'class-validator';
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

	@IsOptional()
	@IsEnum(ResourceTypeEnum)
	type?: ResourceTypeEnum;
}
