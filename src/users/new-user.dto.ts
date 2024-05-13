import { OmitType } from "@nestjs/swagger";
import { User } from "./user.entity";
import { IsNotEmpty } from "class-validator";

export class NewUserDto extends OmitType(User, []) {
    @IsNotEmpty()
    username: string;
}