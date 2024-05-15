import { IsOptional } from 'class-validator';

export class UpdateMarketDto {
  @IsOptional()
  name?: string;
}
