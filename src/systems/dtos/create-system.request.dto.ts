import { IsNotEmpty } from 'class-validator';

export class CreateSystemRequestDto {
	@IsNotEmpty()
	name: string;
}
