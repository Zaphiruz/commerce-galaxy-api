import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger'

import { Recipe } from './schemas/recipe.schema'
import { NewRecipeDto } from './dtos/new-recipe.dto'
import { UpdateRecipeDto } from './dtos/update-recipe.dto'
import { ObjectIdDto } from 'src/common/dtos/object-id.dto'
import { RecipeService } from './recipe.service'
import { AuthGuard } from '../auth/auth.guard'
import { PoliciesGuard } from '../casl/policies.guard'
import { CheckPolicies } from 'src/casl/policies.decorator'
import { ActionEnum } from 'src/casl/action.enum'
import { AppAbility } from 'src/casl/casl-ability.factory'

@UseGuards(AuthGuard, PoliciesGuard)
@ApiTags('recipes')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
@Controller('recipes')
export class RecipeController {
    constructor(
        private readonly recipeService: RecipeService,
    ) { }

    @Get()
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Recipe))
    @ApiOkResponse({ type: [Recipe] })
    public async getAllRecipes(): Promise<Recipe[]> {
        return this.recipeService.findAll();
    }

    @Get(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Recipe))
    @ApiOkResponse({ type: Recipe })
    public async getRecipeById(@Param() objectIdDto: ObjectIdDto): Promise<Recipe> {
        return this.recipeService.findOne(objectIdDto.id);
    }

    @Post()
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Create, Recipe))
    @ApiOkResponse({ type: Recipe })
    @ApiBadRequestResponse()
    public async createRecipe(@Body() newRecipeDto: NewRecipeDto): Promise<Recipe> {
        if (!newRecipeDto) {
            throw new BadRequestException('request invalid');
        }
        return this.recipeService.create(newRecipeDto);
    }

    @Put(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Update, Recipe))
    @ApiOkResponse({ type: Recipe })
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    public async updatePlanet(@Param() objectIdDto: ObjectIdDto, @Body() updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
        if (!updateRecipeDto) {
            throw new BadRequestException('request invalid');
        }
        return this.recipeService.update(objectIdDto.id, updateRecipeDto);
    }

    @Delete(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Delete, Recipe))
    @ApiOkResponse({ type: Recipe })
    @ApiInternalServerErrorResponse()
    public async deletePlanet(@Param() objectIdDto: ObjectIdDto): Promise<Recipe> {
        return this.recipeService.delete(objectIdDto.id);
    }
}