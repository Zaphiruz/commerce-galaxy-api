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

import { Fabricator } from './fabricator.entity'
import { NewFabricatorDto } from './new-fabricator.dto'
import { UpdateFabricatorDto } from './update-fabricator.dto'
import { ObjectIdDto } from 'src/common/object-id.dto'
import { FabricatorService } from './fabricator.service'

@ApiTags('fabricators')
@Controller('fabricators')
export class FabricatorController {
    constructor(
        private readonly fabricatorService: FabricatorService,
    ) { }

    @Get()
    @ApiOkResponse({ type: [Fabricator] })
    public async getAllFabricators(): Promise<Fabricator[]> {
        return this.fabricatorService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: Fabricator })
    public async getFabricatorById(@Param() objectIdDto: ObjectIdDto): Promise<Fabricator> {
        return this.fabricatorService.findOne(objectIdDto.id);
    }

    @Post()
    @ApiOkResponse({ type: Fabricator })
    @ApiBadRequestResponse()
    public async createFabricator(@Body() newFabricatorDto: NewFabricatorDto): Promise<Fabricator> {
        if (!newFabricatorDto) {
            throw new BadRequestException('request invalid');
        }
        return this.fabricatorService.create(newFabricatorDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: Fabricator })
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    public async updateFabricator(@Param() objectIdDto: ObjectIdDto, @Body() updateFabricatorDto: UpdateFabricatorDto): Promise<Fabricator> {
        if (!updateFabricatorDto) {
            throw new BadRequestException('request invalid');
        }
        return this.fabricatorService.update(objectIdDto.id, updateFabricatorDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: Fabricator })
    @ApiInternalServerErrorResponse()
    public async deleteFabricator(@Param() objectIdDto: ObjectIdDto): Promise<Fabricator> {
        return this.fabricatorService.delete(objectIdDto.id);
    }
}