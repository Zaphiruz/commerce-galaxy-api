import { IsNotEmpty } from 'class-validator';

export class CreateNoteRequestDto {
	@IsNotEmpty()
	title: string;

	@IsNotEmpty()
	content: string;

	@IsNotEmpty()
	date: string;
}
