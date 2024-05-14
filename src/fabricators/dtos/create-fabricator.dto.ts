import { IsNotEmpty } from "class-validator";

export class NewFabricatorDto {
    @IsNotEmpty()
    name: string;
 }