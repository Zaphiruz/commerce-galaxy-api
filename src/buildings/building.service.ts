import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import { Building, BuildingDocument } from './schemas/building.schema';
import { CrudBaseService } from 'src/crud-base/crud-base.service';

@Injectable()
export class BuildingService extends CrudBaseService<Building> {
	logger = new Logger(Building.name);

	constructor(
		@InjectModel(Building.name) private model: Model<Building>,
		private readonly httpService: HttpService, // Inject HttpService 
	) {
		super(model);
		this.setLogger(this.logger);
		this.setPopulateList('base', 'catalog', 'producing', 'queue');
	}
	
	async update(id: string, building: Partial<Building>): Promise<BuildingDocument> {
		try {
			await lastValueFrom(this.httpService.post('https://commercegalaxy.online/tasks', {
			  collection: 'buildings',
			  itemId: 'aaaaaaaaaaaaaaaaaaaaaaaa',
			  action: 'Stuff',
			  delay: 5000,
			}));
			this.logger.log('Task sent successfully');
		  } catch (error) {
			this.logger.error('Error sending task', error);
		  }
		return await super.update(id, building);
	}
}
