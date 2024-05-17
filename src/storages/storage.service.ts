import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Storage } from './schemas/storage.schema';
import { CrudBaseService } from 'src/crud-base/crud-base.service';

@Injectable()
export class StorageService extends CrudBaseService<Storage> {
	logger = new Logger(Storage.name);

	constructor(@InjectModel(Storage.name) private model: Model<Storage>) {
		super(model);
		this.setLogger(this.logger);
	}
}
