import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { CrudServiceInterface } from './crud-base.interface';
import { FilterQuery, HydratedDocument, Model } from 'mongoose';

@Injectable()
export class CrudBaseService<T> implements CrudServiceInterface<T> {
	logger: Logger;

	constructor(private readonly basemodule: Model<T>) {}

	setLogger(logger: Logger) {
		this.logger = logger;
	}

	async findAll(
		query: FilterQuery<T> = null,
	): Promise<HydratedDocument<T>[]> {
		try {
			return this.basemodule.find(query).exec();
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}
	async findOne(query: FilterQuery<T>): Promise<HydratedDocument<T>> {
		try {
			const record = await this.basemodule.findOne(query).exec();
			return record;
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}
	async get(id: string): Promise<HydratedDocument<T>> {
		try {
			const record = await this.basemodule.findById(id).exec();
			return record;
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}
	async update(id: string, update: Partial<T>): Promise<HydratedDocument<T>> {
		const updatedRecord = await this.basemodule.findByIdAndUpdate(
			id,
			{ $set: update },
			{ returnDocument: 'after' },
		);
		return updatedRecord;
	}
	async delete(id: string): Promise<HydratedDocument<T>> {
		try {
			return this.basemodule.findByIdAndDelete(id);
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}

	async create(create: Partial<T>): Promise<HydratedDocument<T>> {
		try {
			const createdRecord = new this.basemodule(create);
			const doc = await createdRecord.save();
			return doc.toObject();
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}
}
