import { IsNotEmpty } from 'class-validator';

export class CreateContractRequestDto {
	@IsNotEmpty()
	name: string;
}
