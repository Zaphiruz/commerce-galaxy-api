import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { System } from './schemas/system.schema';
import { CrudBaseService } from 'src/crud-base/crud-base.service';

@Injectable()
export class SystemService extends CrudBaseService<System> {
	logger = new Logger(System.name);

	constructor(@InjectModel(System.name) private model: Model<System>) {
		super(model);
		this.setLogger(this.logger);
	}
}
