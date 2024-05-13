import { OmitType, PartialType } from "@nestjs/swagger";
import { Worker } from "./worker.entity";

export class UpdateWorkerDto extends PartialType(OmitType(Worker, [])) { }