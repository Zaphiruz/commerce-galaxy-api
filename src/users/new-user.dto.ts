import { OmitType } from "@nestjs/swagger";
import { User } from "./user.entity";

export class NewUserDto extends OmitType(User, []) { }