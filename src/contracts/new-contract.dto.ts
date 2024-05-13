import { OmitType } from "@nestjs/swagger";
import { Contract } from "./contract.entity";

export class NewContractDto extends OmitType(Contract, []) { }