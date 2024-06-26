import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildingController } from './building.controller';
import { BuildingService } from './building.service';
import { Building, BuildingSchema } from './schemas/building.schema';
import { CaslModule } from 'src/casl/casl.module';
import { UsersModule } from 'src/users/user.module';
import { HttpModule } from '@nestjs/axios';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Building.name, schema: BuildingSchema },
		]),
		CaslModule,
		UsersModule,
		HttpModule,
	],
	controllers: [BuildingController],
	providers: [BuildingService],
	exports: [BuildingService],
})
export class BuildingsModule {}
