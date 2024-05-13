import { OmitType } from "@nestjs/swagger";
import { Building } from "./building.entity";

export class NewBuildingDto extends OmitType(Building, []) { }