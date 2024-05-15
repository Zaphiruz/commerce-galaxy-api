import { IsNotEmpty } from 'class-validator';

export class NewRecipeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  symbol: string;
}
