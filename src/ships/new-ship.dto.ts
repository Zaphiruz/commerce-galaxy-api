import { OmitType } from "@nestjs/swagger";
import { Ship } from "./ship.entity";
import { IsNotEmpty } from "class-validator";

export class NewShipDto extends OmitType(Ship, []) { }