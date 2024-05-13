import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Put,
} from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger'

import { Market } from './market.entity'
import { NewMarketDto } from './new-market.dto'
import { UpdateMarketDto } from './update-market.dto'
import { ObjectIdDto } from 'src/common/object-id.dto'
import { MarketService } from './market.service'

@ApiTags('markets')
@Controller('markets')
export class MarketController {
    constructor(
        private readonly marketService: MarketService,
    ) { }

    @Get()
    @ApiOkResponse({ type: [Market] })
    public async getAllMarkets(): Promise<Market[]> {
        return this.marketService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: Market })
    public async getMarketById(@Param() objectIdDto: ObjectIdDto): Promise<Market> {
        return this.marketService.findOne(objectIdDto.id);
    }

    @Post()
    @ApiOkResponse({ type: Market })
    @ApiBadRequestResponse()
    public async createMarket(@Body() newMarketDto: NewMarketDto): Promise<Market> {
        if (!newMarketDto) {
            throw new BadRequestException('request invalid');
        }
        return this.marketService.create(newMarketDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: Market })
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    public async updateMarket(@Param() objectIdDto: ObjectIdDto, @Body() updateMarketDto: UpdateMarketDto): Promise<Market> {
        if (!updateMarketDto) {
            throw new BadRequestException('request invalid');
        }
        return this.marketService.update(objectIdDto.id, updateMarketDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: Market })
    @ApiInternalServerErrorResponse()
    public async deleteMarket(@Param() objectIdDto: ObjectIdDto): Promise<Market> {
        return this.marketService.delete(objectIdDto.id);
    }
}