import { IsOptional } from 'class-validator';

export class UpdateWorkerRequestDto {
	@IsOptional()
	name?: string;
}
