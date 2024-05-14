import { IsNotEmpty } from "class-validator";

export class UpdateWorkerDto {
    @IsNotEmpty()
    name: string;
 }