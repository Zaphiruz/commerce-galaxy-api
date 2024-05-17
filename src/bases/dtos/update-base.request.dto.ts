import { IsOptional, IsPositive } from 'class-validator';

export class UpdateBaseRequestDto {
	@IsOptional()
	name?: string;

	@IsOptional()
	@IsPositive()
	size?: number;

	@IsOptional()
	buildings?: string[];
}
