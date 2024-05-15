import { IsOptional } from 'class-validator';

export class UpdateShipDto {
  @IsOptional()
  name?: string;
}
