import { OmitType, PartialType } from "@nestjs/swagger";
import { Resource } from "./resource.entity";

export class UpdateResourceDto extends PartialType(OmitType(Resource, [])) { }