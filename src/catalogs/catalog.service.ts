import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Catalog } from './schemas/catalog.schema';
import { CrudBaseService } from 'src/crud-base/crud-base.service';

@Injectable()
export class CatalogService extends CrudBaseService<Catalog> {
	logger = new Logger(Catalog.name);

	constructor(@InjectModel(Catalog.name) private model: Model<Catalog>) {
		super(model);
		this.setLogger(this.logger);
	}
}
