import { OmitType, PartialType } from "@nestjs/swagger";
import { Building } from "./building.entity";

export class UpdateBuildingDto extends PartialType(OmitType(Building, [])) { }