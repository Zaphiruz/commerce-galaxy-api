import { IsNotEmpty } from "class-validator";

export class NewUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}