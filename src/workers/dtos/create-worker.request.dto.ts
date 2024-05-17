import { IsNotEmpty } from 'class-validator';

export class CreateWorkerRequestDto {
	@IsNotEmpty()
	name: string;
}
