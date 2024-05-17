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

import { Worker } from './schemas/worker.schema';
import { CreateWorkerDto } from './dtos/create-worker.request.dto';
import { UpdateWorkerDto } from './dtos/update-worker.request.dto';
import { WorkerService } from './worker.service';
import { WorkerResponseDto } from './dtos/worker.response.dto';

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

@ApiTags('workers')
@Controller('workers')
@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<WorkerResponseDto>(WorkerResponseDto))
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class WorkerController extends CrudBaseController<Worker> {
	logger = new Logger(WorkerController.name);

	constructor(private readonly modelService: WorkerService) {
		super(modelService);
		super.setLogger(this.logger);
	}

	@Get()
	@CheckPolicies(new ReadPolicyHandler(Worker))
	@ApiOkResponse({ type: [Worker] })
	public async getAll(): Promise<Worker[]> {
		return super.getAll.call(this);
	}

	@Get(':id')
	@CheckPolicies(new ReadPolicyHandler(Worker))
	@ApiOkResponse({ type: Worker })
	public async get(@Param() objectIdDto: ObjectIdDto): Promise<Worker> {
		return super.get.call(this, objectIdDto);
	}

	@Post()
	@CheckPolicies(new CreatePolicyHandler(Worker))
	@ApiOkResponse({ type: Worker })
	@ApiBadRequestResponse()
	public async create(@Body() createDto: CreateWorkerDto): Promise<Worker> {
		return super.create.call(this, createDto);
	}

	@Put(':id')
	@CheckPolicies(new UpdatePolicyHandler(Worker))
	@ApiOkResponse({ type: Worker })
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	public async update(
		@Param() objectIdDto: ObjectIdDto,
		@Body() updateDto: UpdateWorkerDto,
	): Promise<Worker> {
		return super.update.call(this, objectIdDto, updateDto);
	}

	@Delete(':id')
	@CheckPolicies(new DeletePolicyHandler(Worker))
	@ApiOkResponse({ type: Worker })
	@ApiInternalServerErrorResponse()
	public async delete(@Param() objectIdDto: ObjectIdDto): Promise<Worker> {
		return super.delete.call(this, objectIdDto);
	}
}
