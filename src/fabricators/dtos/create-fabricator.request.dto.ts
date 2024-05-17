import { IsNotEmpty } from 'class-validator';

export class CreateFabricatorRequestDto {
	@IsNotEmpty()
	name: string;
}
