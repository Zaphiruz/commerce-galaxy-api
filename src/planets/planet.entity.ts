import { ObjectId, Entity, ObjectIdColumn } from 'typeorm'

@Entity()
export class Planet {
    @ObjectIdColumn() id: ObjectId;

    constructor(planet?: Partial<Planet>) {
        Object.assign(this, planet)
    }
}