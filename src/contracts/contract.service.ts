import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Contract } from './schemas/contract.schema';
import { CrudBaseService } from 'src/crud-base/crud-base.service';

@Injectable()
export class ContractService extends CrudBaseService<Contract> {
	logger = new Logger(Contract.name);

	constructor(@InjectModel(Contract.name) private model: Model<Contract>) {
		super(model);
		this.setLogger(this.logger);
	}
}
