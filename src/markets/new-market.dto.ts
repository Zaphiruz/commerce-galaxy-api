import { OmitType } from "@nestjs/swagger";
import { Market } from "./market.entity";

export class NewMarketDto extends OmitType(Market, []) { }