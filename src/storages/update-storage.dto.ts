import { OmitType, PartialType } from "@nestjs/swagger";
import { Storage } from "./storage.entity";

export class UpdateStorageDto extends PartialType(OmitType(Storage, [])) { }