import { IsNotEmpty } from 'class-validator';

export class CreateShipDto {
	@IsNotEmpty()
	name: string;
}
