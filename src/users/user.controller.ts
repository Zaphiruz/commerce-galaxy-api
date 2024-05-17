import {
	Body,
	Controller,
	Delete,
	Get,
	Logger,
	NotFoundException,
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

import { User } from './schemas/user.schema';
import { CreateUserRequestDto } from './dtos/create-user.request.dto';
import { UpdateUserRequestDto } from './dtos/update-user.request.dto';
import { UserService } from './user.service';
import { UserResponseDto } from './dtos/user.response.dto';

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

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<UserResponseDto>(UserResponseDto))
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class UserController extends CrudBaseController<User> {
	logger = new Logger(UserController.name);

	constructor(private readonly modelService: UserService) {
		super(modelService);
		super.setLogger(this.logger);
	}

	@Get()
	@CheckPolicies(new ReadPolicyHandler(User))
	@ApiOkResponse({ type: [User] })
	public async getAll(): Promise<User[]> {
		return super.getAll.call(this);
	}

	@Get('me')
	@CheckPolicies(new ReadPolicyHandler(User))
	@ApiOkResponse({ type: User })
	public async me(@Req() req: AuthRequest): Promise<User> {
		const doc = this.modelService.get(req.user._id.toHexString());
		if (!doc) {
			throw new NotFoundException();
		}

		return doc;
	}

	@Get(':id')
	@CheckPolicies(new ReadPolicyHandler(User))
	@ApiOkResponse({ type: User })
	public async get(@Param() objectIdDto: ObjectIdDto): Promise<User> {
		return super.get.call(this, objectIdDto);
	}

	@Post()
	@CheckPolicies(new CreatePolicyHandler(User))
	@ApiOkResponse({ type: User })
	@ApiBadRequestResponse()
	public async create(
		@Body() createDto: CreateUserRequestDto,
	): Promise<User> {
		return super.create.call(this, createDto);
	}

	@Put(':id')
	@CheckPolicies(new UpdatePolicyHandler(User))
	@ApiOkResponse({ type: User })
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	public async update(
		@Param() objectIdDto: ObjectIdDto,
		@Body() updateDto: UpdateUserRequestDto,
	): Promise<User> {
		return super.update.call(this, objectIdDto, updateDto);
	}

	@Delete(':id')
	@CheckPolicies(new DeletePolicyHandler(User))
	@ApiOkResponse({ type: User })
	@ApiInternalServerErrorResponse()
	public async delete(@Param() objectIdDto: ObjectIdDto): Promise<User> {
		return super.delete.call(this, objectIdDto);
	}
}
