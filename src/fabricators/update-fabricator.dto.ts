import { OmitType, PartialType } from "@nestjs/swagger";
import { Fabricator } from "./fabricator.entity";

export class UpdateFabricatorDto extends PartialType(OmitType(Fabricator, [])) { }