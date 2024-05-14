import { IsNotEmpty } from "class-validator";

export class NewShipDto { 
    @IsNotEmpty()
    name: string;
}
