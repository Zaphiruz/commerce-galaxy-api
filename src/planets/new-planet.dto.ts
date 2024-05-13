import { OmitType } from "@nestjs/swagger";
import { Planet } from "./planet.entity";

export class NewPlanetDto extends OmitType(Planet, []) { }