import { IsMongoId, IsOptional, IsArray } from 'class-validator';

export class UpdateBuildingRequestDto {
	@IsOptional()
	@IsMongoId()
	catalog?: string;

	@IsOptional()
	@IsMongoId()
	base?: string;

	@IsOptional()
	startTime?: Date;

	@IsOptional()
	@IsMongoId()
	producing?: string;

	@IsOptional()
	@IsArray()
	@IsMongoId({ each: true })
	queue?: string[];
}
