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

import { Catalog } from './schemas/catalog.schema';
import { CreateCatalogRequestDto } from './dtos/create-catalog.request.dto';
import { UpdateCatalogRequestDto } from './dtos/update-catalog.request.dto';
import { CatalogService } from './catalog.service';
import { CatalogResponseDto } from './dtos/catalog.response.dto';

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

@ApiTags('catalogs')
@Controller('catalogs')
@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<CatalogResponseDto>(CatalogResponseDto))
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class CatalogController extends CrudBaseController<Catalog> {
	logger = new Logger(CatalogController.name);

	constructor(private readonly modelService: CatalogService) {
		super(modelService);
		super.setLogger(this.logger);
	}

	@Get()
	@CheckPolicies(new ReadPolicyHandler(Catalog))
	@ApiOkResponse({ type: [Catalog] })
	public async getAll(): Promise<Catalog[]> {
		return super.getAll.call(this);
	}

	@Get(':id')
	@CheckPolicies(new ReadPolicyHandler(Catalog))
	@ApiOkResponse({ type: Catalog })
	public async get(@Param() objectIdDto: ObjectIdDto): Promise<Catalog> {
		return super.get.call(this, objectIdDto);
	}

	@Post()
	@CheckPolicies(new CreatePolicyHandler(Catalog))
	@ApiOkResponse({ type: Catalog })
	@ApiBadRequestResponse()
	public async create(
		@Body() createDto: CreateCatalogRequestDto,
	): Promise<Catalog> {
		return super.create.call(this, createDto);
	}

	@Put(':id')
	@CheckPolicies(new UpdatePolicyHandler(Catalog))
	@ApiOkResponse({ type: Catalog })
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	public async update(
		@Param() objectIdDto: ObjectIdDto,
		@Body() updateDto: UpdateCatalogRequestDto,
	): Promise<Catalog> {
		return super.update.call(this, objectIdDto, updateDto);
	}

	@Delete(':id')
	@CheckPolicies(new DeletePolicyHandler(Catalog))
	@ApiOkResponse({ type: Catalog })
	@ApiInternalServerErrorResponse()
	public async delete(@Param() objectIdDto: ObjectIdDto): Promise<Catalog> {
		return super.delete.call(this, objectIdDto);
	}
}
