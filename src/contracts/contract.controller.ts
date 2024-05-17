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

import { Contract } from './schemas/contract.schema';
import { CreateContractRequestDto } from './dtos/create-contract.request.dto';
import { UpdateContractRequestDto } from './dtos/update-contract.request.dto';
import { ContractService } from './contract.service';
import { ContractResponseDto } from './dtos/contract.response.dto';

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

@ApiTags('contracts')
@Controller('contracts')
@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<ContractResponseDto>(ContractResponseDto))
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class ContractController extends CrudBaseController<Contract> {
	logger = new Logger(ContractController.name);

	constructor(private readonly modelService: ContractService) {
		super(modelService);
		super.setLogger(this.logger);
	}

	@Get()
	@CheckPolicies(new ReadPolicyHandler(Contract))
	@ApiOkResponse({ type: [Contract] })
	public async getAll(): Promise<Contract[]> {
		return super.getAll.call(this);
	}

	@Get(':id')
	@CheckPolicies(new ReadPolicyHandler(Contract))
	@ApiOkResponse({ type: Contract })
	public async get(@Param() objectIdDto: ObjectIdDto): Promise<Contract> {
		return super.get.call(this, objectIdDto);
	}

	@Post()
	@CheckPolicies(new CreatePolicyHandler(Contract))
	@ApiOkResponse({ type: Contract })
	@ApiBadRequestResponse()
	public async create(
		@Body() createDto: CreateContractRequestDto,
	): Promise<Contract> {
		return super.create.call(this, createDto);
	}

	@Put(':id')
	@CheckPolicies(new UpdatePolicyHandler(Contract))
	@ApiOkResponse({ type: Contract })
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	public async update(
		@Param() objectIdDto: ObjectIdDto,
		@Body() updateDto: UpdateContractRequestDto,
	): Promise<Contract> {
		return super.update.call(this, objectIdDto, updateDto);
	}

	@Delete(':id')
	@CheckPolicies(new DeletePolicyHandler(Contract))
	@ApiOkResponse({ type: Contract })
	@ApiInternalServerErrorResponse()
	public async delete(@Param() objectIdDto: ObjectIdDto): Promise<Contract> {
		return super.delete.call(this, objectIdDto);
	}
}
