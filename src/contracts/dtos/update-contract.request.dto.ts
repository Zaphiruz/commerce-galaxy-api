import { IsNotEmpty } from 'class-validator';

export class UpdateContractRequestDto {
	@IsNotEmpty()
	name: string;
}
