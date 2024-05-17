import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Ship } from './schemas/ship.schema';
import { CrudBaseService } from 'src/crud-base/crud-base.service';

@Injectable()
export class ShipService extends CrudBaseService<Ship> {
	logger = new Logger(Ship.name);

	constructor(@InjectModel(Ship.name) private model: Model<Ship>) {
		super(model);
		this.setLogger(this.logger);
	}
}
