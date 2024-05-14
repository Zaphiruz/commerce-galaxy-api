import { IsBoolean, IsNotEmpty } from 'class-validator';
const bcrypt = require('bcrypt');
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserRolesEnum } from '../user-roles.enum';

const SALT_WORK_FACTOR = 10;

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @ApiProperty({ type: String })
    _id: Types.ObjectId;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: [String], enum: UserRolesEnum, default: [] })
    roles: UserRolesEnum[]

    constructor(user?: Partial<User>) {
        Object.assign(this, user)
    }
}

export const UserSchema = SchemaFactory.createForClass(User);

export async function hashPassword(pass: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  return bcrypt.hash(pass, salt);
}

UserSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await hashPassword(this.password);
        return next();
      } catch (err) {
        return next(err);
      }
});
