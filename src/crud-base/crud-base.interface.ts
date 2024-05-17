import { HydratedDocument } from 'mongoose';

export interface CrudServiceInterface<T> {
	findAll(): Promise<HydratedDocument<T>[]>;
	get(id: string): Promise<HydratedDocument<T>>;
	update(id: string, entity: Partial<T>): Promise<HydratedDocument<T>>;
	create(entity: Partial<T>): Promise<HydratedDocument<T>>;
	delete(id: string): Promise<HydratedDocument<T>>;
}
