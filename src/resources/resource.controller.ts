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

import { Resource } from './schemas/resource.schema';
import { CreateResourceRequestDto } from './dtos/create-resource.request.dto';
import { UpdateResourceRequestDto } from './dtos/update-resource.request.dto';
import { ResourceService } from './resource.service';
import { ResourceResponseDto } from './dtos/resource.response.dto';

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

@ApiTags('resources')
@Controller('resources')
@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<ResourceResponseDto>(ResourceResponseDto))
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class ResourceController extends CrudBaseController<Resource> {
	logger = new Logger(ResourceController.name);

	constructor(private readonly modelService: ResourceService) {
		super(modelService);
		super.setLogger(this.logger);
	}

	@Get()
	@CheckPolicies(new ReadPolicyHandler(Resource))
	@ApiOkResponse({ type: [Resource] })
	public async getAll(): Promise<Resource[]> {
		return super.getAll.call(this);
	}

	@Get(':id')
	@CheckPolicies(new ReadPolicyHandler(Resource))
	@ApiOkResponse({ type: Resource })
	public async get(@Param() objectIdDto: ObjectIdDto): Promise<Resource> {
		return super.get.call(this, objectIdDto);
	}

	@Post()
	@CheckPolicies(new CreatePolicyHandler(Resource))
	@ApiOkResponse({ type: Resource })
	@ApiBadRequestResponse()
	public async create(
		@Body() createDto: CreateResourceRequestDto,
	): Promise<Resource> {
		return super.create.call(this, createDto);
	}

	@Put(':id')
	@CheckPolicies(new UpdatePolicyHandler(Resource))
	@ApiOkResponse({ type: Resource })
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	public async update(
		@Param() objectIdDto: ObjectIdDto,
		@Body() updateDto: UpdateResourceRequestDto,
	): Promise<Resource> {
		return super.update.call(this, objectIdDto, updateDto);
	}

	@Delete(':id')
	@CheckPolicies(new DeletePolicyHandler(Resource))
	@ApiOkResponse({ type: Resource })
	@ApiInternalServerErrorResponse()
	public async delete(@Param() objectIdDto: ObjectIdDto): Promise<Resource> {
		return super.delete.call(this, objectIdDto);
	}
}
