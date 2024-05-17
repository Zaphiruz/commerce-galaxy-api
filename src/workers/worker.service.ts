import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Worker } from './schemas/worker.schema';
import { CrudBaseService } from 'src/crud-base/crud-base.service';

@Injectable()
export class WorkerService extends CrudBaseService<Worker> {
	logger = new Logger(Worker.name);

	constructor(@InjectModel(Worker.name) private model: Model<Worker>) {
		super(model);
		this.setLogger(this.logger);
	}
}
