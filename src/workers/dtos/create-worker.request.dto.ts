import { IsNotEmpty } from 'class-validator';

export class NewWorkerDto {
  @IsNotEmpty()
  name: string;
}
