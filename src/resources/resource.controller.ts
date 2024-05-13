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

import { Resource } from './resource.entity'
import { NewResourceDto } from './new-resource.dto'
import { UpdateResourceDto } from './update-resource.dto'
import { ObjectIdDto } from 'src/common/object-id.dto'
import { ResourceService } from './resource.service'

@ApiTags('resources')
@Controller('resources')
export class ResourceController {
    constructor(
        private readonly resourceService: ResourceService,
    ) { }

    @Get()
    @ApiOkResponse({ type: [Resource] })
    public async getAllResources(): Promise<Resource[]> {
        return this.resourceService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: Resource })
    public async getResourceById(@Param() objectIdDto: ObjectIdDto): Promise<Resource> {
        return this.resourceService.findOne(objectIdDto.id);
    }

    @Post()
    @ApiOkResponse({ type: Resource })
    @ApiBadRequestResponse()
    public async createResource(@Body() newResourceDto: NewResourceDto): Promise<Resource> {
        if (!newResourceDto) {
            throw new BadRequestException('request invalid');
        }
        return this.resourceService.create(newResourceDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: Resource })
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    public async updatePlanet(@Param() objectIdDto: ObjectIdDto, @Body() updateResourceDto: UpdateResourceDto): Promise<Resource> {
        if (!updateResourceDto) {
            throw new BadRequestException('request invalid');
        }
        return this.resourceService.update(objectIdDto.id, updateResourceDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: Resource })
    @ApiInternalServerErrorResponse()
    public async deletePlanet(@Param() objectIdDto: ObjectIdDto): Promise<Resource> {
        return this.resourceService.delete(objectIdDto.id);
    }
}