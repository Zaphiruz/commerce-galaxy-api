import { OmitType, PartialType } from "@nestjs/swagger";
import { Market } from "./market.entity";

export class UpdateMarketDto extends PartialType(OmitType(Market, [])) { }