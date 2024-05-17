import { IsNotEmpty, IsEnum } from 'class-validator';
import { ResourceTypeEnum } from '../resource-type.enum';

export class CreateRecipeREquestDto {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	symbol: string;

	@IsNotEmpty()
	time: number;

	@IsNotEmpty()
	amount: number;

	@IsEnum(ResourceTypeEnum)
	type: ResourceTypeEnum;
}
