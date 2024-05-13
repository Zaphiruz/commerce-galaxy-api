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

import { Storage } from './storage.entity'
import { NewStorageDto } from './new-storage.dto'
import { UpdateStorageDto } from './update-storage.dto'
import { ObjectIdDto } from 'src/common/object-id.dto'
import { StorageService } from './storage.service'

@ApiTags('storages')
@Controller('storages')
export class StorageController {
    constructor(
        private readonly storageService: StorageService,
    ) { }

    @Get()
    @ApiOkResponse({ type: [Storage] })
    public async getAllStorages(): Promise<Storage[]> {
        return this.storageService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: Storage })
    public async getStorageById(@Param() objectIdDto: ObjectIdDto): Promise<Storage> {
        return this.storageService.findOne(objectIdDto.id);
    }

    @Post()
    @ApiOkResponse({ type: Storage })
    @ApiBadRequestResponse()
    public async createStorage(@Body() newStorageDto: NewStorageDto): Promise<Storage> {
        if (!newStorageDto) {
            throw new BadRequestException('request invalid');
        }
        return this.storageService.create(newStorageDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: Storage })
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    public async updateStorage(@Param() objectIdDto: ObjectIdDto, @Body() updateStorageDto: UpdateStorageDto): Promise<Storage> {
        if (!updateStorageDto) {
            throw new BadRequestException('request invalid');
        }
        return this.storageService.update(objectIdDto.id, updateStorageDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: Storage })
    @ApiInternalServerErrorResponse()
    public async deleteStorage(@Param() objectIdDto: ObjectIdDto): Promise<Storage> {
        return this.storageService.delete(objectIdDto.id);
    }
}