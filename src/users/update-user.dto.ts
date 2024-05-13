import { OmitType, PartialType } from "@nestjs/swagger";
import { User } from "./user.entity";

export class UpdaetUserDto extends PartialType(OmitType(User, [])) { }