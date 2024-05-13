import { IsNotEmpty } from 'class-validator';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @IsNotEmpty()
    @Prop()
    username: string;

    constructor(user?: Partial<User>) {
        Object.assign(this, user)
    }
}

export const UserSchema = SchemaFactory.createForClass(User);