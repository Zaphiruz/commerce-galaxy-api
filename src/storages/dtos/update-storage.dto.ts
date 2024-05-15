import { IsOptional } from 'class-validator';

export class UpdateStorageDto {
  @IsOptional()
  name?: string;
}
