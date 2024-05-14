import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaslModule } from 'src/casl/casl.module';
import { UsersModule } from 'src/users/user.module';

import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { Contract, ContractSchema } from './schemas/contract.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Contract.name, schema: ContractSchema }]),
    CaslModule,
    UsersModule,
  ],
  controllers: [ContractController],
  providers: [ContractService],
  exports: [ContractService],
})
export class ContractsModule {}