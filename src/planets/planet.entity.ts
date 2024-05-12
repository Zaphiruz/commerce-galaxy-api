import { Column, ObjectId, Entity, ObjectIdColumn } from 'typeorm'

@Entity()
export class Planet {
    @ObjectIdColumn() id: ObjectId;

    constructor(user?: Partial<Planet>) {
        Object.assign(this, user)
    }
}