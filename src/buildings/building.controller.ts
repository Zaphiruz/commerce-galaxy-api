import {
	Body,
	Controller,
	Delete,
	Get,
	Logger,
	Param,
	Post,
	Put,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import {
	ApiTags,
	ApiOkResponse,
	ApiBadRequestResponse,
	ApiInternalServerErrorResponse,
	ApiBearerAuth,
	ApiUnauthorizedResponse,
	ApiForbiddenResponse,
} from '@nestjs/swagger';

import { Building } from './schemas/building.schema';
import { CreateBuildingRequestDto } from './dtos/create-building.request.dto';
import { UpdateBuildingRequestDto } from './dtos/update-building.request.dto';
import { BuildingService } from './building.service';
import { BuildingResponseDto } from './dtos/building.response.dto';

import { ObjectIdDto } from 'src/common/dtos/object-id.dto';
import { AuthGuard } from '../auth/auth.guard';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from 'src/casl/policies.decorator';
import { DtoInterceptor } from '../common/interceptors/dto-converter.interceptor';
import { CrudBaseController } from 'src/crud-base/crud-base.controller';
import {
	CreatePolicyHandler,
	DeletePolicyHandler,
	ReadPolicyHandler,
	UpdatePolicyHandler,
} from 'src/casl/casl.handler';

@ApiTags('buildings')
@Controller('buildings')
@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<BuildingResponseDto>(BuildingResponseDto))
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class BuildingController extends CrudBaseController<Building> {
	logger = new Logger(BuildingController.name);

	constructor(private readonly modelService: BuildingService) {
		super(modelService);
		super.setLogger(this.logger);
	}

	@Get()
	@CheckPolicies(new ReadPolicyHandler(Building))
	@ApiOkResponse({ type: [Building] })
	public async getAll(): Promise<Building[]> {
		return super.getAll.call(this);
	}

	@Get(':id')
	@CheckPolicies(new ReadPolicyHandler(Building))
	@ApiOkResponse({ type: Building })
	public async get(@Param() objectIdDto: ObjectIdDto): Promise<Building> {
		return super.get.call(this, objectIdDto);
	}

	@Post()
	@CheckPolicies(new CreatePolicyHandler(Building))
	@ApiOkResponse({ type: Building })
	@ApiBadRequestResponse()
	public async create(
		@Body() createDto: CreateBuildingRequestDto,
	): Promise<Building> {
		return super.create.call(this, createDto);
	}

	@Put(':id')
	@CheckPolicies(new UpdatePolicyHandler(Building))
	@ApiOkResponse({ type: Building })
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	public async update(
		@Param() objectIdDto: ObjectIdDto,
		@Body() updateDto: UpdateBuildingRequestDto,
	): Promise<Building> {
		return super.update.call(this, objectIdDto, updateDto);
	}

	@Delete(':id')
	@CheckPolicies(new DeletePolicyHandler(Building))
	@ApiOkResponse({ type: Building })
	@ApiInternalServerErrorResponse()
	public async delete(@Param() objectIdDto: ObjectIdDto): Promise<Building> {
		return super.delete.call(this, objectIdDto);
	}
}
