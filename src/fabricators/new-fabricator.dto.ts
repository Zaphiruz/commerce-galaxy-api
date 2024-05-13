import { OmitType } from "@nestjs/swagger";
import { Fabricator } from "./fabricator.entity";

export class NewFabricatorDto extends OmitType(Fabricator, []) { }