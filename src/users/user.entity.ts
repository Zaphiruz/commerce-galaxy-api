import { Column, ObjectId, Entity, ObjectIdColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

@Entity()
export class User {
    @ObjectIdColumn()
    @IsNotEmpty()
    @Length(24, 24)
    @ApiProperty({ type: String })
    id: ObjectId;

    @IsNotEmpty()
    @Column()
    username: string;

    constructor(user?: Partial<User>) {
        Object.assign(this, user)
    }
}