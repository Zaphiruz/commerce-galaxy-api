import { IsOptional } from 'class-validator';

export class UpdateMarketRequestDto {
	@IsOptional()
	name?: string;
}
