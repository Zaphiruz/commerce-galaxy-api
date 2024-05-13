import { IsEnum, IsNotEmpty } from 'class-validator';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ResourceTypeEnum } from 'src/enums/resource-type.enum';

export type ResourceDocument = HydratedDocument<Resource>;

@Schema()
export class Resource {
    @IsNotEmpty()
    @Prop()
    name: string;

    @IsNotEmpty()
    @Prop()
    symbol: string;

    @IsEnum(ResourceTypeEnum)
    @Prop()
    type: ResourceTypeEnum;

    constructor(resource?: Partial<Resource>) {
        Object.assign(this, resource)
    }
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);