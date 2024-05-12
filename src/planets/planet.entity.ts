import { ObjectId, Entity, ObjectIdColumn, Column } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

@Entity()
export class Planet {
    @ObjectIdColumn()
    @IsNotEmpty()
    @Length(24, 24)
    @ApiProperty({ type: String })
    id: ObjectId;

    @IsNotEmpty()
    @Column()
    name: string;

    constructor(planet?: Partial<Planet>) {
        Object.assign(this, planet)
    }
}