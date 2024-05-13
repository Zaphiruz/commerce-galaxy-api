import { OmitType, PartialType } from "@nestjs/swagger";
import { System } from "./system.entity";

export class UpdateSystemDto extends PartialType(OmitType(System, [])) { }