import { OmitType, PartialType } from "@nestjs/swagger";
import { Recipe } from "./recipe.entity";

export class UpdateRecipeDto extends PartialType(OmitType(Recipe, [])) { }