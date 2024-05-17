import { IsNotEmpty } from 'class-validator';

export class CreateStorageDto {
	@IsNotEmpty()
	name: string;
}
