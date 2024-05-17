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

import { Ship } from './schemas/ship.schema';
import { CreateShipDto } from './dtos/create-ship.request.dto';
import { UpdateShipDto } from './dtos/update-ship.request.dto';
import { ShipService } from './ship.service';
import { ShipResponseDto } from './dtos/ship.response.dto';

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

@ApiTags('ships')
@Controller('ships')
@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<ShipResponseDto>(ShipResponseDto))
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class ShipController extends CrudBaseController<Ship> {
	logger = new Logger(ShipController.name);

	constructor(private readonly modelService: ShipService) {
		super(modelService);
		super.setLogger(this.logger);
	}

	@Get()
	@CheckPolicies(new ReadPolicyHandler(Ship))
	@ApiOkResponse({ type: [Ship] })
	public async getAll(): Promise<Ship[]> {
		return super.getAll.call(this);
	}

	@Get(':id')
	@CheckPolicies(new ReadPolicyHandler(Ship))
	@ApiOkResponse({ type: Ship })
	public async get(@Param() objectIdDto: ObjectIdDto): Promise<Ship> {
		return super.get.call(this, objectIdDto);
	}

	@Post()
	@CheckPolicies(new CreatePolicyHandler(Ship))
	@ApiOkResponse({ type: Ship })
	@ApiBadRequestResponse()
	public async create(@Body() createDto: CreateShipDto): Promise<Ship> {
		return super.create.call(this, createDto);
	}

	@Put(':id')
	@CheckPolicies(new UpdatePolicyHandler(Ship))
	@ApiOkResponse({ type: Ship })
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	public async update(
		@Param() objectIdDto: ObjectIdDto,
		@Body() updateDto: UpdateShipDto,
	): Promise<Ship> {
		return super.update.call(this, objectIdDto, updateDto);
	}

	@Delete(':id')
	@CheckPolicies(new DeletePolicyHandler(Ship))
	@ApiOkResponse({ type: Ship })
	@ApiInternalServerErrorResponse()
	public async delete(@Param() objectIdDto: ObjectIdDto): Promise<Ship> {
		return super.delete.call(this, objectIdDto);
	}
}
