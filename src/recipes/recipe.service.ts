import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Recipe } from './recipe.entity';
import { NewRecipeDto } from './new-recipe.dto';
import { UpdateRecipeDto } from './update-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}

  async create(newRecipeDto: NewRecipeDto): Promise<Recipe> {
    const createdCat = new this.recipeModel(newRecipeDto);
    return createdCat.save();
  }

  async findAll(): Promise<Recipe[]> {
    return this.recipeModel.find().exec();
  }

  async findOne(id: string): Promise<Recipe> {
    return this.recipeModel.findById(id).exec();
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    return this.recipeModel.findByIdAndUpdate(id, { "$set": updateRecipeDto }, { returnDocument: 'after' });
  }

  async delete(id: string): Promise<Recipe> {
    return this.recipeModel.findByIdAndDelete(id);
  }
}
