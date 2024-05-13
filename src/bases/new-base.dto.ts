import { OmitType } from "@nestjs/swagger";
import { Base } from "./base.entity";

export class NewBaseDto extends OmitType(Base, []) { }