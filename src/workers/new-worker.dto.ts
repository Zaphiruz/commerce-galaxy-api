import { OmitType } from "@nestjs/swagger";
import { Worker } from "./worker.entity";
import { IsNotEmpty } from "class-validator";

export class NewWorkerDto extends OmitType(Worker, []) { }