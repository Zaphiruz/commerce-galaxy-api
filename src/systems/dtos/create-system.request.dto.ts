import { IsNotEmpty } from 'class-validator';

export class CreateSystemDto {
	@IsNotEmpty()
	name: string;
}
