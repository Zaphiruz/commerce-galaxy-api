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

import { Planet } from './schemas/planet.schema';
import { CreatePlanetRequestDto } from './dtos/create-planet.request.dto';
import { UpdatePlanetRequestDto } from './dtos/update-planet.request.dto';
import { PlanetService } from './planet.service';
import { PlanetResponseDto } from './dtos/planet.response.dto';

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

@ApiTags('planets')
@Controller('planets')
@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<PlanetResponseDto>(PlanetResponseDto))
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class PlanetController extends CrudBaseController<Planet> {
	logger = new Logger(PlanetController.name);

	constructor(private readonly modelService: PlanetService) {
		super(modelService);
		super.setLogger(this.logger);
	}

	@Get()
	@CheckPolicies(new ReadPolicyHandler(Planet))
	@ApiOkResponse({ type: [Planet] })
	public async getAll(): Promise<Planet[]> {
		return super.getAll.call(this);
	}

	@Get(':id')
	@CheckPolicies(new ReadPolicyHandler(Planet))
	@ApiOkResponse({ type: Planet })
	public async get(@Param() objectIdDto: ObjectIdDto): Promise<Planet> {
		return super.get.call(this, objectIdDto);
	}

	@Post()
	@CheckPolicies(new CreatePolicyHandler(Planet))
	@ApiOkResponse({ type: Planet })
	@ApiBadRequestResponse()
	public async create(
		@Body() createDto: CreatePlanetRequestDto,
	): Promise<Planet> {
		return super.create.call(this, createDto);
	}

	@Put(':id')
	@CheckPolicies(new UpdatePolicyHandler(Planet))
	@ApiOkResponse({ type: Planet })
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	public async update(
		@Param() objectIdDto: ObjectIdDto,
		@Body() updateDto: UpdatePlanetRequestDto,
	): Promise<Planet> {
		return super.update.call(this, objectIdDto, updateDto);
	}

	@Delete(':id')
	@CheckPolicies(new DeletePolicyHandler(Planet))
	@ApiOkResponse({ type: Planet })
	@ApiInternalServerErrorResponse()
	public async delete(@Param() objectIdDto: ObjectIdDto): Promise<Planet> {
		return super.delete.call(this, objectIdDto);
	}
}
