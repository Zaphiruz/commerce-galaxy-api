// import { ObjectId, Entity, ObjectIdColumn, Column, OneToMany } from 'typeorm'
// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, Length } from 'class-validator';
// import { Base } from '../bases/base.entity';

// @Entity()
// export class Planet {
//     @ObjectIdColumn()
//     @IsNotEmpty()
//     @Length(24, 24)
//     @ApiProperty({ type: String })
//     id: ObjectId;

//     @IsNotEmpty()
//     @Column()
//     name: string;

//     @OneToMany(type => Base, base => base.planet)
//     bases: Base[];

//     constructor(planet?: Partial<Planet>) {
//         Object.assign(this, planet)
//     }
// }