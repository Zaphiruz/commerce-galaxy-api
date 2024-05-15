import { IsNotEmpty } from 'class-validator';

export class UpdateContractDto {
  @IsNotEmpty()
  name: string;
}
