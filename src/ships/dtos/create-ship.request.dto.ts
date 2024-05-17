import { IsNotEmpty } from 'class-validator';

export class CreateShipRequestDto {
	@IsNotEmpty()
	name: string;
}
