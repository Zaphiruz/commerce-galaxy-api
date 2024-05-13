import { IsNotEmpty } from 'class-validator';
const bcrypt = require('bcrypt');
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

const SALT_WORK_FACTOR = 10;

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @IsNotEmpty()
    @Prop({ required: true, unique: true })
    username: string;

    @IsNotEmpty()
    @Prop({ required: true })
    password: string;

    constructor(user?: Partial<User>) {
        Object.assign(this, user)
    }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
      } catch (err) {
        return next(err);
      }
});
