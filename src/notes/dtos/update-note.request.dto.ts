import { IsOptional } from 'class-validator';

export class UpdateNoteRequestDto {
	@IsOptional()
	title?: string;

	@IsOptional()
	content?: string;

	@IsOptional()
	date?: string;
}
