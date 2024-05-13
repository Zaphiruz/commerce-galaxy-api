import { IsNotEmpty } from 'class-validator';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContractDocument = HydratedDocument<Contract>;

@Schema()
export class Contract {
    @IsNotEmpty()
    @Prop()
    name: string;

    constructor(contract?: Partial<Contract>) {
        Object.assign(this, contract)
    }
}

export const ContractSchema = SchemaFactory.createForClass(Contract);