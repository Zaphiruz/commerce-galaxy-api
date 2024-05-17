import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Market } from './schemas/market.schema';
import { CrudBaseService } from 'src/crud-base/crud-base.service';

@Injectable()
export class MarketService extends CrudBaseService<Market> {
	logger = new Logger(Market.name);

	constructor(@InjectModel(Market.name) private model: Model<Market>) {
		super(model);
		this.setLogger(this.logger);
	}
}
