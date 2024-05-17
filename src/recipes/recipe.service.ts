import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Recipe } from './schemas/recipe.schema';
import { CrudBaseService } from 'src/crud-base/crud-base.service';

@Injectable()
export class RecipeService extends CrudBaseService<Recipe> {
	logger = new Logger(Recipe.name);

	constructor(@InjectModel(Recipe.name) private model: Model<Recipe>) {
		super(model);
		this.setLogger(this.logger);
	}
}
