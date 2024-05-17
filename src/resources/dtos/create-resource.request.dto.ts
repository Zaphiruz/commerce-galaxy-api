import { IsEnum, IsNotEmpty } from 'class-validator';

import { ResourceTypeEnum } from 'src/resources/resource-type.enum';

export class CreateResourceRequestDto {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	symbol: string;

	@IsEnum(ResourceTypeEnum)
	type: ResourceTypeEnum;
}
