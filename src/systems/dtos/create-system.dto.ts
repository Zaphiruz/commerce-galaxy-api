import { IsNotEmpty } from 'class-validator';

export class NewSystemDto {
  @IsNotEmpty()
  name: string;
}
