import { OmitType } from "@nestjs/swagger";
import { Storage } from "./storage.entity";

export class NewStorageDto extends OmitType(Storage, []) { }