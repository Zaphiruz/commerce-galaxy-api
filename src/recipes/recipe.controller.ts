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

import { Recipe } from './schemas/recipe.schema';
import { CreateRecipeDto } from './dtos/create-recipe.request.dto';
import { UpdateRecipeDto } from './dtos/update-recipe.request.dto';
import { RecipeService } from './recipe.service';
import { RecipeResponseDto } from './dtos/recipe.response.dto';

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

@ApiTags('recipes')
@Controller('recipes')
@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<RecipeResponseDto>(RecipeResponseDto))
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class RecipeController extends CrudBaseController<Recipe> {
	logger = new Logger(RecipeController.name);

	constructor(private readonly modelService: RecipeService) {
		super(modelService);
		super.setLogger(this.logger);
	}

	@Get()
	@CheckPolicies(new ReadPolicyHandler(Recipe))
	@ApiOkResponse({ type: [Recipe] })
	public async getAll(): Promise<Recipe[]> {
		return super.getAll.call(this);
	}

	@Get(':id')
	@CheckPolicies(new ReadPolicyHandler(Recipe))
	@ApiOkResponse({ type: Recipe })
	public async get(@Param() objectIdDto: ObjectIdDto): Promise<Recipe> {
		return super.get.call(this, objectIdDto);
	}

	@Post()
	@CheckPolicies(new CreatePolicyHandler(Recipe))
	@ApiOkResponse({ type: Recipe })
	@ApiBadRequestResponse()
	public async create(@Body() createDto: CreateRecipeDto): Promise<Recipe> {
		return super.create.call(this, createDto);
	}

	@Put(':id')
	@CheckPolicies(new UpdatePolicyHandler(Recipe))
	@ApiOkResponse({ type: Recipe })
	@ApiBadRequestResponse()
	@ApiInternalServerErrorResponse()
	public async update(
		@Param() objectIdDto: ObjectIdDto,
		@Body() updateDto: UpdateRecipeDto,
	): Promise<Recipe> {
		return super.update.call(this, objectIdDto, updateDto);
	}

	@Delete(':id')
	@CheckPolicies(new DeletePolicyHandler(Recipe))
	@ApiOkResponse({ type: Recipe })
	@ApiInternalServerErrorResponse()
	public async delete(@Param() objectIdDto: ObjectIdDto): Promise<Recipe> {
		return super.delete.call(this, objectIdDto);
	}
}
