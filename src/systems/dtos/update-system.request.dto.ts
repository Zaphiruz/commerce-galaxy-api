import { IsOptional } from 'class-validator';

export class UpdateSystemDto {
	@IsOptional()
	name?: string;
}
