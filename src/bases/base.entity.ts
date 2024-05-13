import { Column, ObjectId, Entity, ObjectIdColumn, ManyToOne, JoinColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, isNotEmpty } from 'class-validator';
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
    @Column({name: 'planet_id'})
    planet_id: string;

    @IsNotEmpty()
    @Column({name: 'owner_id'})
    owner_id: string;

    @ManyToOne(() => Planet, (planet) => planet.bases)
    @JoinColumn({ name: 'planet_id'})
    planet: Planet;

    @ManyToOne(() => User, (user) => user.bases)
    @JoinColumn({ name: 'owner_id'})
    owner: User;

    constructor(base?: Partial<Base>) {
        Object.assign(this, base)
    }
}