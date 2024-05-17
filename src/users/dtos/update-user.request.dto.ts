import { IsOptional } from 'class-validator';

export class UpdateUserRequestDto {
	@IsOptional()
	password?: string;
}
