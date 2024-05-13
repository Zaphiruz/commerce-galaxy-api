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

import { Worker } from './worker.entity'
import { NewWorkerDto } from './new-worker.dto'
import { UpdateWorkerDto } from './update-worker.dto'
import { ObjectIdDto } from 'src/common/dtos/object-id.dto'
import { WorkerService } from './worker.service'

@ApiTags('workers')
@Controller('workers')
export class WorkerController {
    constructor(
        private readonly workerService: WorkerService,
    ) { }

    @Get()
    @ApiOkResponse({ type: [Worker] })
    public async getAllWorkers(): Promise<Worker[]> {
        return this.workerService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: Worker })
    public async getWorkerById(@Param() objectIdDto: ObjectIdDto): Promise<Worker> {
        return this.workerService.findOne(objectIdDto.id);
    }

    @Post()
    @ApiOkResponse({ type: Worker })
    @ApiBadRequestResponse()
    public async createWorker(@Body() newWorkerDto: NewWorkerDto): Promise<Worker> {
        if (!newWorkerDto) {
            throw new BadRequestException('request invalid');
        }
        return this.workerService.create(newWorkerDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: Worker })
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    public async updatePlanet(@Param() objectIdDto: ObjectIdDto, @Body() updateWorkerDto: UpdateWorkerDto): Promise<Worker> {
        if (!updateWorkerDto) {
            throw new BadRequestException('request invalid');
        }
        return this.workerService.update(objectIdDto.id, updateWorkerDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: Worker })
    @ApiInternalServerErrorResponse()
    public async deletePlanet(@Param() objectIdDto: ObjectIdDto): Promise<Worker> {
        return this.workerService.delete(objectIdDto.id);
    }
}