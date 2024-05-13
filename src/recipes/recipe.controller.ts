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
} from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger'

import { Recipe } from './recipe.entity'
import { NewRecipeDto } from './new-recipe.dto'
import { UpdateRecipeDto } from './update-recipe.dto'
import { ObjectIdDto } from 'src/common/object-id.dto'
import { RecipeService } from './recipe.service'

@ApiTags('recipes')
@Controller('recipes')
export class RecipeController {
    constructor(
        private readonly recipeService: RecipeService,
    ) { }

    @Get()
    @ApiOkResponse({ type: [Recipe] })
    public async getAllRecipes(): Promise<Recipe[]> {
        return this.recipeService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: Recipe })
    public async getRecipeById(@Param() objectIdDto: ObjectIdDto): Promise<Recipe> {
        return this.recipeService.findOne(objectIdDto.id);
    }

    @Post()
    @ApiOkResponse({ type: Recipe })
    @ApiBadRequestResponse()
    public async createRecipe(@Body() newRecipeDto: NewRecipeDto): Promise<Recipe> {
        if (!newRecipeDto) {
            throw new BadRequestException('request invalid');
        }
        return this.recipeService.create(newRecipeDto);
    }

    @Put(':id')
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
    @ApiOkResponse({ type: Recipe })
    @ApiInternalServerErrorResponse()
    public async deletePlanet(@Param() objectIdDto: ObjectIdDto): Promise<Recipe> {
        return this.recipeService.delete(objectIdDto.id);
    }
}