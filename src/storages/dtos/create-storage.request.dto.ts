import { IsNotEmpty } from 'class-validator';

export class CreateStorageRequestDto {
	@IsNotEmpty()
	name: string;
}
