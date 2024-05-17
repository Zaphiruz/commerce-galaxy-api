import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { CrudBaseService } from 'src/crud-base/crud-base.service';

@Injectable()
export class UserService extends CrudBaseService<User> {
	logger = new Logger(User.name);

	constructor(@InjectModel(User.name) private model: Model<User>) {
		super(model);
		this.setLogger(this.logger);
	}

	async findByUsername(username: string): Promise<UserDocument> {
		return super.findOne({ username });
	}
}
