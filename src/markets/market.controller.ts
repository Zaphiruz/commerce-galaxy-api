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

import { Market } from './schemas/market.schema';
import { CreateMarketRequestDto } from './dtos/create-market.request.dto';
import { UpdateMarketRequestDto } from './dtos/update-market.request.dto';
import { MarketService } from './market.service';
import { MarketResponseDto } from './dtos/market.response.dto';

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

@ApiTags('markets')
@Controller('markets')
@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<MarketResponseDto>(MarketResponseDto))
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class MarketController extends CrudBaseController<Market> {
	logger = new Logger(MarketController.name);

	constructor(private readonly modelService: MarketService) {
		super(modelService);
		super.setLogger(this.logger);
	}

	@Get()
	@CheckPolicies(new ReadPolicyHandler(Market))
	@ApiOkResponse({ type: [Market] })
	public async getAll(): Promise<Market[]> {
		return super.getAll.call(this);
	}

	@Get(':id')
	@CheckPolicies(new ReadPolicyHandler(Market))
	@ApiOkResponse({ type: Market })
	public async get(@Param() objectIdDto: ObjectIdDto): Promise<Market> {
		return super.get.call(this, objectIdDto);
	}

	@Post()
	@CheckPolicies(new CreatePolicyHandler(Market))
	@ApiOkResponse({ type: Market })
	@ApiBadRequestResponse()
	public async create(
		@Body() createDto: CreateMarketRequestDto,
	): Promise<Market> {
		return super.create.call(this, createDto);
	}

	@Put(':id')
	@CheckPolicies(new UpdatePolicyHandler(Market))
	@ApiOkResponse({ type: Market })
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	public async update(
		@Param() objectIdDto: ObjectIdDto,
		@Body() updateDto: UpdateMarketRequestDto,
	): Promise<Market> {
		return super.update.call(this, objectIdDto, updateDto);
	}

	@Delete(':id')
	@CheckPolicies(new DeletePolicyHandler(Market))
	@ApiOkResponse({ type: Market })
	@ApiInternalServerErrorResponse()
	public async delete(@Param() objectIdDto: ObjectIdDto): Promise<Market> {
		return super.delete.call(this, objectIdDto);
	}
}
