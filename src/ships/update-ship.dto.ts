import { OmitType, PartialType } from "@nestjs/swagger";
import { Ship } from "./ship.entity";

export class UpdateShipDto extends PartialType(OmitType(Ship, [])) { }