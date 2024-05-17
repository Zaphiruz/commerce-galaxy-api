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

import { Fabricator } from './schemas/fabricator.schema';
import { CreateFabricatorRequestDto } from './dtos/create-fabricator.request.dto';
import { UpdateFabricatorRequestDto } from './dtos/update-fabricator.request.dto';
import { FabricatorService } from './fabricator.service';
import { FabricatorResponseDto } from './dtos/fabricator.response.dto';

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

@ApiTags('fabricators')
@Controller('fabricators')
@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(
	new DtoInterceptor<FabricatorResponseDto>(FabricatorResponseDto),
)
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class FabricatorController extends CrudBaseController<Fabricator> {
	logger = new Logger(FabricatorController.name);

	constructor(private readonly modelService: FabricatorService) {
		super(modelService);
		super.setLogger(this.logger);
	}

	@Get()
	@CheckPolicies(new ReadPolicyHandler(Fabricator))
	@ApiOkResponse({ type: [Fabricator] })
	public async getAll(): Promise<Fabricator[]> {
		return super.getAll.call(this);
	}

	@Get(':id')
	@CheckPolicies(new ReadPolicyHandler(Fabricator))
	@ApiOkResponse({ type: Fabricator })
	public async get(@Param() objectIdDto: ObjectIdDto): Promise<Fabricator> {
		return super.get.call(this, objectIdDto);
	}

	@Post()
	@CheckPolicies(new CreatePolicyHandler(Fabricator))
	@ApiOkResponse({ type: Fabricator })
	@ApiBadRequestResponse()
	public async create(
		@Body() createDto: CreateFabricatorRequestDto,
	): Promise<Fabricator> {
		return super.create.call(this, createDto);
	}

	@Put(':id')
	@CheckPolicies(new UpdatePolicyHandler(Fabricator))
	@ApiOkResponse({ type: Fabricator })
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	public async update(
		@Param() objectIdDto: ObjectIdDto,
		@Body() updateDto: UpdateFabricatorRequestDto,
	): Promise<Fabricator> {
		return super.update.call(this, objectIdDto, updateDto);
	}

	@Delete(':id')
	@CheckPolicies(new DeletePolicyHandler(Fabricator))
	@ApiOkResponse({ type: Fabricator })
	@ApiInternalServerErrorResponse()
	public async delete(
		@Param() objectIdDto: ObjectIdDto,
	): Promise<Fabricator> {
		return super.delete.call(this, objectIdDto);
	}
}
