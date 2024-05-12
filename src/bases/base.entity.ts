import { Column, ObjectId, Entity, ObjectIdColumn, ManyToOne, JoinColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { Planet } from '../planets/planet.entity';
import { User } from '../users/user.entity';

@Entity()
export class Base {
    @ObjectIdColumn()
    @IsNotEmpty()
    @Length(24, 24)
    @ApiProperty({ type: String })
    id: ObjectId;

    @IsNotEmpty()
    @Column()
    name: string;

    @IsNotEmpty()
    @Column()
    size: number;

    @IsNotEmpty()
    @ManyToOne(type => Planet, planet => planet.id)
    //@JoinColumn({ name: 'id' })
    planet: Planet;

    @IsNotEmpty()
    @ManyToOne(type => User, user => user.id)
    owner: User;

    constructor(base?: Partial<Base>) {
        Object.assign(this, base)
    }
}