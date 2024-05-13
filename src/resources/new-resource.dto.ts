import { OmitType } from "@nestjs/swagger";
import { Resource } from "./resource.entity";

export class NewResourceDto extends OmitType(Resource, []) { }