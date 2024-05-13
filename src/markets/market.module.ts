import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';
import { Market, MarketSchema } from './market.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Market.name, schema: MarketSchema }])],
  controllers: [MarketController],
  providers: [MarketService],
})
export class MarketsModule {}