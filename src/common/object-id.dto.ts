import { IsHexadecimal, IsNotEmpty, Length } from "class-validator";


export class ObjectIdDto {
    @IsNotEmpty()
    @IsHexadecimal()
    @Length(24, 24)
    id: string;
}