import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { Contract, ContractSchema } from './contract.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Contract.name, schema: ContractSchema }])],
  controllers: [ContractController],
  providers: [ContractService],
})
export class ContractsModule {}