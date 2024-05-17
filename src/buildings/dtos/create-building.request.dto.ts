import { IsMongoId } from 'class-validator';

export class CreateBuildingRequestDto {
  @IsMongoId()
  catalog: string;

  @IsMongoId()
  base: string;
}
