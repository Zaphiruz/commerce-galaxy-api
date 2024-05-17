import { IsOptional } from 'class-validator';

export class UpdateShipRequestDto {
	@IsOptional()
	name?: string;
}
