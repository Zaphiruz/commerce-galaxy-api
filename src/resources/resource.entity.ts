import { Column, ObjectId, Entity, ObjectIdColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { ResourceTypeEnum } from '../enums/resource-type.enum';

@Entity()
export class Resource {
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
    symbol: string;

    @IsNotEmpty()
    @Column()
    type: ResourceTypeEnum;

    constructor(resource?: Partial<Resource>) {
        Object.assign(this, resource)
    }
}