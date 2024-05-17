import { IsOptional } from 'class-validator';

export class UpdateFabricatorRequestDto {
	@IsOptional()
	name?: string;
}
