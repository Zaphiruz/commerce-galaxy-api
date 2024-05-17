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

import { Storage } from './schemas/storage.schema';
import { CreateStorageDto } from './dtos/create-storage.request.dto';
import { UpdateStorageDto } from './dtos/update-storage.request.dto';
import { StorageService } from './storage.service';
import { StorageResponseDto } from './dtos/storage.response.dto';

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

@ApiTags('storages')
@Controller('storages')
@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<StorageResponseDto>(StorageResponseDto))
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class StorageController extends CrudBaseController<Storage> {
	logger = new Logger(StorageController.name);

	constructor(private readonly modelService: StorageService) {
		super(modelService);
		super.setLogger(this.logger);
	}

	@Get()
	@CheckPolicies(new ReadPolicyHandler(Storage))
	@ApiOkResponse({ type: [Storage] })
	public async getAll(): Promise<Storage[]> {
		return super.getAll.call(this);
	}

	@Get(':id')
	@CheckPolicies(new ReadPolicyHandler(Storage))
	@ApiOkResponse({ type: Storage })
	public async get(@Param() objectIdDto: ObjectIdDto): Promise<Storage> {
		return super.get.call(this, objectIdDto);
	}

	@Post()
	@CheckPolicies(new CreatePolicyHandler(Storage))
	@ApiOkResponse({ type: Storage })
	@ApiBadRequestResponse()
	public async create(@Body() createDto: CreateStorageDto): Promise<Storage> {
		return super.create.call(this, createDto);
	}

	@Put(':id')
	@CheckPolicies(new UpdatePolicyHandler(Storage))
	@ApiOkResponse({ type: Storage })
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	public async update(
		@Param() objectIdDto: ObjectIdDto,
		@Body() updateDto: UpdateStorageDto,
	): Promise<Storage> {
		return super.update.call(this, objectIdDto, updateDto);
	}

	@Delete(':id')
	@CheckPolicies(new DeletePolicyHandler(Storage))
	@ApiOkResponse({ type: Storage })
	@ApiInternalServerErrorResponse()
	public async delete(@Param() objectIdDto: ObjectIdDto): Promise<Storage> {
		return super.delete.call(this, objectIdDto);
	}
}
