import { IsNotEmpty } from 'class-validator';

export class CreateUserRequestDto {
	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	password: string;
}
