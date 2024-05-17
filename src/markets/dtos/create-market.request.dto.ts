import { IsNotEmpty } from 'class-validator';

export class CreateMarketRequestDto {
	@IsNotEmpty()
	name: string;
}
