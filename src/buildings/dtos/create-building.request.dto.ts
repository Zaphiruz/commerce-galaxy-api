import { IsMongoId, IsNotEmpty, IsArray } from 'class-validator';

export class CreateBuildingRequestDto {
	@IsMongoId()
	catalog: string;

	@IsMongoId()
	base: string;

	@IsNotEmpty()
	startTime: Date;

	@IsMongoId()
	producing: string;

	@IsArray()
	@IsMongoId({ each: true })
	queue: string[];
}
