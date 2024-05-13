import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';
import { ResourceTypeEnum } from 'src/enums/resource-type.enum';

export type ResourceDocument = HydratedDocument<Resource>;

@Schema()
export class Resource {
    @Transform(({ value }) => value.toHexString())
    @ApiProperty({ type: String })
    _id: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    symbol: string;

    @Prop({ required: true })
    type: ResourceTypeEnum;

    constructor(resource?: Partial<Resource>) {
        Object.assign(this, resource)
    }
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);