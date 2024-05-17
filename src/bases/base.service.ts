import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Base } from './schemas/base.schema';
import { CrudBaseService } from 'src/crud-base/crud-base.service';

@Injectable()
export class BaseService extends CrudBaseService<Base> {
	logger = new Logger(Base.name);

	constructor(@InjectModel(Base.name) private model: Model<Base>) {
		super(model);
		this.setLogger(this.logger);
		this.setPopulateList('buildings', 'user', 'planet');
	}
}
