import { Column, ObjectId, Entity, ObjectIdColumn, OneToMany } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { Base } from '../bases/base.entity';

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

    @OneToMany(type => Base, base => base.owner)
    bases: Base[];

    constructor(user?: Partial<User>) {
        Object.assign(this, user)
    }
}