import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Recipe } from './schemas/recipe.schema';
import { NewRecipeDto } from './dtos/create-recipe.dto';
import { UpdateRecipeDto } from './dtos/update-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}

  async create(newRecipeDto: NewRecipeDto): Promise<Recipe> {
    const createdCat = new this.recipeModel(newRecipeDto);
    return createdCat.save();
  }

  async findAll(query = null): Promise<Recipe[]> {
    return this.recipeModel.find(query).exec();
  }

  async findOne(id: string): Promise<Recipe> {
    return this.recipeModel.findById(id).exec();
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    return this.recipeModel.findByIdAndUpdate(
      id,
      { $set: updateRecipeDto },
      { returnDocument: 'after' },
    );
  }

  async delete(id: string): Promise<Recipe> {
    return this.recipeModel.findByIdAndDelete(id);
  }
}
