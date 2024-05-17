import { IsOptional } from 'class-validator';

export class UpdateStorageRequestDto {
	@IsOptional()
	name?: string;
}
