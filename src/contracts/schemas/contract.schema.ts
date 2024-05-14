import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export type ContractDocument = HydratedDocument<Contract>;

@Schema()
export class Contract {
    @ApiProperty({ type: String })
    _id: Types.ObjectId;
    
    @Prop()
    name: string;

    constructor(contract?: Partial<Contract>) {
        Object.assign(this, contract)
    }
}

export const ContractSchema = SchemaFactory.createForClass(Contract);