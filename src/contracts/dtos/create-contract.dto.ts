import { IsNotEmpty } from "class-validator";

export class NewContractDto {
    @IsNotEmpty()
    name: string;
 }