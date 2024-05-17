import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Planet } from './schemas/planet.schema';
import { CrudBaseService } from 'src/crud-base/crud-base.service';

@Injectable()
export class PlanetService extends CrudBaseService<Planet> {
	logger = new Logger(Planet.name);

	constructor(@InjectModel(Planet.name) private model: Model<Planet>) {
		super(model);
		this.setLogger(this.logger);
	}
}
