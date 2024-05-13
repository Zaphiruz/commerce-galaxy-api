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

import { Ship } from './ship.entity'
import { NewShipDto } from './new-ship.dto'
import { UpdateShipDto } from './update-ship.dto'
import { ObjectIdDto } from 'src/common/object-id.dto'
import { ShipService } from './ship.service'

@ApiTags('ships')
@Controller('ships')
export class ShipController {
    constructor(
        private readonly shipService: ShipService,
    ) { }

    @Get()
    @ApiOkResponse({ type: [Ship] })
    public async getAllShips(): Promise<Ship[]> {
        return this.shipService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: Ship })
    public async getShipById(@Param() objectIdDto: ObjectIdDto): Promise<Ship> {
        return this.shipService.findOne(objectIdDto.id);
    }

    @Post()
    @ApiOkResponse({ type: Ship })
    @ApiBadRequestResponse()
    public async createShip(@Body() newShipDto: NewShipDto): Promise<Ship> {
        if (!newShipDto) {
            throw new BadRequestException('request invalid');
        }
        return this.shipService.create(newShipDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: Ship })
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    public async updatePlanet(@Param() objectIdDto: ObjectIdDto, @Body() updateShipDto: UpdateShipDto): Promise<Ship> {
        if (!updateShipDto) {
            throw new BadRequestException('request invalid');
        }
        return this.shipService.update(objectIdDto.id, updateShipDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: Ship })
    @ApiInternalServerErrorResponse()
    public async deletePlanet(@Param() objectIdDto: ObjectIdDto): Promise<Ship> {
        return this.shipService.delete(objectIdDto.id);
    }
}