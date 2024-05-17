import {
	Get,
	Post,
	Body,
	Put,
	NotFoundException,
	Delete,
	Param,
	Logger,
} from '@nestjs/common';
import { CrudServiceInterface } from './crud-base.interface';
import { ObjectIdDto } from '../common/dtos/object-id.dto';

export class CrudBaseController<T> {
	logger: Logger;

	constructor(private readonly baseService: CrudServiceInterface<T>) {}

	setLogger(logger: Logger) {
		this.logger = logger;
	}

	@Get()
	async getAll(): Promise<T[]> {
		const entities = await this.baseService.findAll();
		return entities;
	}

	@Get(':id')
	async get(@Param() objectIdDto: ObjectIdDto): Promise<T> {
		const entity = await this.baseService.get(objectIdDto.id);
		if (!entity) {
			throw new NotFoundException('Entity does not exist!');
		}
		return entity;
	}

	@Post()
	async create(@Body() t: Partial<T>): Promise<T> {
		return this.baseService.create(t);
	}

	@Put(':id')
	async update(
		@Param() objectIdDto: ObjectIdDto,
		@Body() t: Partial<T>,
	): Promise<T> {
		const entity = await this.baseService.update(objectIdDto.id, t);
		if (!entity) {
			throw new NotFoundException('Entity does not exist!');
		}
		return entity;
	}

	@Delete(':id')
	async delete(@Param() objectIdDto: ObjectIdDto): Promise<T> {
		const entity = await this.baseService.delete(objectIdDto.id);
		if (!entity) {
			throw new NotFoundException('Entity does not exist');
		}
		return entity;
	}
}
