import { IsNotEmpty } from "class-validator";

export class NewMarketDto {
    @IsNotEmpty()
    name: string;
 }