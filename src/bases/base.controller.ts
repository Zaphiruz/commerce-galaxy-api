import {
	Body,
	Controller,
	Delete,
	Get,
	Logger,
	Param,
	Post,
	Put,
	Req,
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

import { Base } from './schemas/base.schema';
import { CreateBaseRequestDto } from './dtos/create-base.request.dto';
import { UpdateBaseRequestDto } from './dtos/update-base.request.dto';
import { BaseService } from './base.service';
import { BaseResponseDto } from './dtos/base.response.dto';

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
import { AuthRequest } from 'src/common/types/request.type';

@ApiTags('bases')
@Controller('bases')
@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<BaseResponseDto>(BaseResponseDto))
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class BaseController extends CrudBaseController<Base> {
	logger = new Logger(BaseController.name);

	constructor(private readonly modelService: BaseService) {
		super(modelService);
		super.setLogger(this.logger);
	}

	@Get()
	@CheckPolicies(new ReadPolicyHandler(Base))
	@ApiOkResponse({ type: [Base] })
	public async getAll(): Promise<Base[]> {
		return super.getAll.call(this);
	}

	@Get('me')
	@CheckPolicies(new ReadPolicyHandler(Base))
	@ApiOkResponse({ type: [Base] })
	public async me(@Req() req: AuthRequest): Promise<Base[]> {
		const doc = this.modelService.findAll({
			user: req.user._id.toHexString(),
		});
		return doc;
	}

	@Get(':id')
	@CheckPolicies(new ReadPolicyHandler(Base))
	@ApiOkResponse({ type: Base })
	public async get(@Param() objectIdDto: ObjectIdDto): Promise<Base> {
		return super.get.call(this, objectIdDto);
	}

	@Post()
	@CheckPolicies(new CreatePolicyHandler(Base))
	@ApiOkResponse({ type: Base })
	@ApiBadRequestResponse()
	public async create(
		@Body() createDto: CreateBaseRequestDto,
	): Promise<Base> {
		return super.create.call(this, createDto);
	}

	@Put(':id')
	@CheckPolicies(new UpdatePolicyHandler(Base))
	@ApiOkResponse({ type: Base })
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	public async update(
		@Param() objectIdDto: ObjectIdDto,
		@Body() updateDto: UpdateBaseRequestDto,
	): Promise<Base> {
		return super.update.call(this, objectIdDto, updateDto);
	}

	@Delete(':id')
	@CheckPolicies(new DeletePolicyHandler(Base))
	@ApiOkResponse({ type: Base })
	@ApiInternalServerErrorResponse()
	public async delete(@Param() objectIdDto: ObjectIdDto): Promise<Base> {
		return super.delete.call(this, objectIdDto);
	}
}
