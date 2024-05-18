import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Building } from './schemas/building.schema';
import { CrudBaseService } from 'src/crud-base/crud-base.service';

@Injectable()
export class BuildingService extends CrudBaseService<Building> {
	logger = new Logger(Building.name);

	constructor(@InjectModel(Building.name) private model: Model<Building>) {
		super(model);
		this.setLogger(this.logger);
		this.setPopulateList('base', 'catalog', 'producing', 'queue');
	}
}
