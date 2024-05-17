import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Resource } from './schemas/resource.schema';
import { CrudBaseService } from 'src/crud-base/crud-base.service';

@Injectable()
export class ResourceService extends CrudBaseService<Resource> {
	logger = new Logger(Resource.name);

	constructor(@InjectModel(Resource.name) private model: Model<Resource>) {
		super(model);
		this.setLogger(this.logger);
	}
}
