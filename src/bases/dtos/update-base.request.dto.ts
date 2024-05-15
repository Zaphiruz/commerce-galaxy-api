import { IsOptional, IsPositive } from 'class-validator';

export class UpdateBaseRequest {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsPositive()
  size?: number;
}
