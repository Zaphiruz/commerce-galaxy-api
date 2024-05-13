import { OmitType, PartialType } from "@nestjs/swagger";
import { Contract } from "./contract.entity";

export class UpdateContractDto extends PartialType(OmitType(Contract, [])) { }