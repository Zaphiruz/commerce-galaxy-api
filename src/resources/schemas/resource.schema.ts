import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ResourceTypeEnum } from 'src/enums/resource-type.enum';

export type ResourceDocument = HydratedDocument<Resource>;

@Schema()
export class Resource {
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