import { OmitType } from "@nestjs/swagger";
import { System } from "./system.entity";

export class NewSystemDto extends OmitType(System, []) { }