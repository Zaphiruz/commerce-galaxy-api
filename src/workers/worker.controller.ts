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
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger'

import { Worker } from './schemas/worker.schema'
import { NewWorkerDto } from './dtos/create-worker.request.dto'
import { UpdateWorkerDto } from './dtos/update-worker.request.dto'
import { WorkerService } from './worker.service'
import { WorkerResponseDto } from './dtos/worker.response.dto'

import { ObjectIdDto } from 'src/common/dtos/object-id.dto'
import { AuthGuard } from '../auth/auth.guard'
import { PoliciesGuard } from '../casl/policies.guard'
import { CheckPolicies } from 'src/casl/policies.decorator'
import { ActionEnum } from 'src/casl/action.enum'
import { AppAbility } from 'src/casl/casl-ability.factory'
import { plainToInstance } from 'class-transformer'
import { DtoInterceptor } from '../common/dto-converter.interceptor'

@ApiTags('workers')
@Controller('workers')
@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<WorkerResponseDto>(WorkerResponseDto))
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class WorkerController {
    constructor(
        private readonly workerService: WorkerService,
    ) { }

    @Get()
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Worker))
    @ApiOkResponse({ type: [Worker] })
    public async getAllWorkers(): Promise<Worker[]> {
        return this.workerService.findAll();
    }

    @Get(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Worker))
    @ApiOkResponse({ type: Worker })
    public async getWorkerById(@Param() objectIdDto: ObjectIdDto): Promise<Worker> {
        return this.workerService.findOne(objectIdDto.id);
    }

    @Post()
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Worker))
    @ApiOkResponse({ type: Worker })
    @ApiBadRequestResponse()
    public async createWorker(@Body() newWorkerDto: NewWorkerDto): Promise<Worker> {
        if (!newWorkerDto) {
            throw new BadRequestException('request invalid');
        }
        return this.workerService.create(newWorkerDto);
    }

    @Put(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Worker))
    @ApiOkResponse({ type: Worker })
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    public async updateWorker(@Param() objectIdDto: ObjectIdDto, @Body() updateWorkerDto: UpdateWorkerDto): Promise<Worker> {
        if (!updateWorkerDto) {
            throw new BadRequestException('request invalid');
        }
        return this.workerService.update(objectIdDto.id, updateWorkerDto);
    }

    @Delete(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Worker))
    @ApiOkResponse({ type: Worker })
    @ApiInternalServerErrorResponse()
    public async deleteWorker(@Param() objectIdDto: ObjectIdDto): Promise<Worker> {
        return this.workerService.delete(objectIdDto.id);
    }
}