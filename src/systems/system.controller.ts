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

import { System } from './system.entity'
import { NewSystemDto } from './new-system.dto'
import { UpdateSystemDto } from './update-system.dto'
import { ObjectIdDto } from 'src/common/dtos/object-id.dto'
import { SystemService } from './system.service'

@ApiTags('systems')
@Controller('systems')
export class SystemController {
    constructor(
        private readonly systemService: SystemService,
    ) { }

    @Get()
    @ApiOkResponse({ type: [System] })
    public async getAllSystems(): Promise<System[]> {
        return this.systemService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: System })
    public async getSystemById(@Param() objectIdDto: ObjectIdDto): Promise<System> {
        return this.systemService.findOne(objectIdDto.id);
    }

    @Post()
    @ApiOkResponse({ type: System })
    @ApiBadRequestResponse()
    public async createSystem(@Body() newSystemDto: NewSystemDto): Promise<System> {
        if (!newSystemDto) {
            throw new BadRequestException('request invalid');
        }
        return this.systemService.create(newSystemDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: System })
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    public async updateSystem(@Param() objectIdDto: ObjectIdDto, @Body() updateSystemDto: UpdateSystemDto): Promise<System> {
        if (!updateSystemDto) {
            throw new BadRequestException('request invalid');
        }
        return this.systemService.update(objectIdDto.id, updateSystemDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: System })
    @ApiInternalServerErrorResponse()
    public async deleteSystem(@Param() objectIdDto: ObjectIdDto): Promise<System> {
        return this.systemService.delete(objectIdDto.id);
    }
}