import { IsNotEmpty } from 'class-validator';

export class CreateWorkerDto {
	@IsNotEmpty()
	name: string;
}
