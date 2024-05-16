import { IsOptional } from 'class-validator';

export class UpdateBuildingRequestDto {
  @IsOptional()
  catalog: string;
}
