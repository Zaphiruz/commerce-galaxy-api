import { IsOptional } from 'class-validator';

export class UpdateSystemRequestDto {
	@IsOptional()
	name?: string;
}
