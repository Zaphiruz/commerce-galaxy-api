import { OmitType, PartialType } from "@nestjs/swagger";
import { Base } from "./base.entity";

export class UpdateBaseDto extends PartialType(OmitType(Base, ['id'])) { }