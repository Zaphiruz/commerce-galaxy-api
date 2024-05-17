import { IsNotEmpty, IsEnum, IsMongoId } from 'class-validator';
import { ResourceTypeEnum } from '../resource-type.enum';

export class NewRecipeDto {
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

	@IsMongoId()
	resource: string;

	@IsMongoId()
	catalog: string;
}
