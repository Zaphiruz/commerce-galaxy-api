import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Base, BaseDocument } from './schemas/base.schema';
import { CrudBaseService } from 'src/crud-base/crud-base.service';
import { StorageService } from 'src/storages/storage.service';

@Injectable()
export class BaseService extends CrudBaseService<Base> {
	logger = new Logger(Base.name);

	constructor(
		@InjectModel(Base.name) private model: Model<Base>,
		private readonly storeageService: StorageService,
	) {
		super(model);
		this.setLogger(this.logger);
		this.setPopulateList('buildings', 'user', 'planet', 'storage');
	}

	async create(create: Partial<Base>): Promise<BaseDocument> {
		const storageDoc = await this.storeageService.create({
			name: `Base Storage: ${create.name}`,
		});

		create.storage = storageDoc._id.toHexString();
		const baseDoc: BaseDocument = await super.create(create);

		return baseDoc;
	}
}
