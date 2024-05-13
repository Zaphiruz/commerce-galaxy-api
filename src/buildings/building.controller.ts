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

import { Building } from './building.entity'
import { NewBuildingDto } from './new-building.dto'
import { UpdateBuildingDto } from './update-building.dto'
import { ObjectIdDto } from 'src/common/object-id.dto'
import { BuildingService } from './building.service'

@ApiTags('buildings')
@Controller('buildings')
export class BuildingController {
    constructor(
        private readonly buildingService: BuildingService,
    ) { }

    @Get()
    @ApiOkResponse({ type: [Building] })
    public async getAllBuildings(): Promise<Building[]> {
        return this.buildingService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: Building })
    public async getBuildingById(@Param() objectIdDto: ObjectIdDto): Promise<Building> {
        return this.buildingService.findOne(objectIdDto.id);
    }

    @Post()
    @ApiOkResponse({ type: Building })
    @ApiBadRequestResponse()
    public async createBuilding(@Body() newBuildingDto: NewBuildingDto): Promise<Building> {
        if (!newBuildingDto) {
            throw new BadRequestException('request invalid');
        }
        return this.buildingService.create(newBuildingDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: Building })
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    public async updatePlanet(@Param() objectIdDto: ObjectIdDto, @Body() updateBuildingDto: UpdateBuildingDto): Promise<Building> {
        if (!updateBuildingDto) {
            throw new BadRequestException('request invalid');
        }
        return this.buildingService.update(objectIdDto.id, updateBuildingDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: Building })
    @ApiInternalServerErrorResponse()
    public async deletePlanet(@Param() objectIdDto: ObjectIdDto): Promise<Building> {
        return this.buildingService.delete(objectIdDto.id);
    }
}