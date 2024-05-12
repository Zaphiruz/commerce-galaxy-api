import { Column, ObjectId, Entity, ObjectIdColumn } from 'typeorm'

@Entity()
export class User {
    @ObjectIdColumn() id: ObjectId;
    @Column() username: string;

    constructor(user?: Partial<User>) {
        Object.assign(this, user)
    }
}