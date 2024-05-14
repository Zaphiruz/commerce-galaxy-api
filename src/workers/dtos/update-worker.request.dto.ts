import { IsOptional } from "class-validator";

export class UpdateWorkerDto {
    @IsOptional()
    name?: string;
 }