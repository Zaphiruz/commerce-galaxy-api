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

import { Base } from './base.entity'
import { NewBaseDto } from './new-base.dto'
import { UpdateBaseDto } from './update-base.dto'
import { ObjectIdDto } from 'src/common/dtos/object-id.dto'
import { BaseService } from './base.service'

@ApiTags('bases')
@Controller('bases')
export class BaseController {
    constructor(
        private readonly baseService: BaseService,
    ) { }

    @Get()
    @ApiOkResponse({ type: [Base] })
    public async getAllBases(): Promise<Base[]> {
        return this.baseService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: Base })
    public async getBaseById(@Param() objectIdDto: ObjectIdDto): Promise<Base> {
        return this.baseService.findOne(objectIdDto.id);
    }

    @Post()
    @ApiOkResponse({ type: Base })
    @ApiBadRequestResponse()
    public async createBase(@Body() newBaseDto: NewBaseDto): Promise<Base> {
        if (!newBaseDto) {
            throw new BadRequestException('request invalid');
        }
        return this.baseService.create(newBaseDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: Base })
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    public async updatePlanet(@Param() objectIdDto: ObjectIdDto, @Body() updateBaseDto: UpdateBaseDto): Promise<Base> {
        if (!updateBaseDto) {
            throw new BadRequestException('request invalid');
        }
        return this.baseService.update(objectIdDto.id, updateBaseDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: Base })
    @ApiInternalServerErrorResponse()
    public async deletePlanet(@Param() objectIdDto: ObjectIdDto): Promise<Base> {
        return this.baseService.delete(objectIdDto.id);
    }
}