import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Fabricator } from './schemas/fabricator.schema';
import { CrudBaseService } from 'src/crud-base/crud-base.service';

@Injectable()
export class FabricatorService extends CrudBaseService<Fabricator> {
	logger = new Logger(Fabricator.name);

	constructor(
		@InjectModel(Fabricator.name) private model: Model<Fabricator>,
	) {
		super(model);
		this.setLogger(this.logger);
	}
}
