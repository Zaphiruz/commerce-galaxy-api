import { OmitType } from "@nestjs/swagger";
import { Recipe } from "./recipe.entity";

export class NewRecipeDto extends OmitType(Recipe, []) { }