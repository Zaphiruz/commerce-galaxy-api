import { IsNotEmpty } from 'class-validator';

export class NewStorageDto {
  @IsNotEmpty()
  name: string;
}
