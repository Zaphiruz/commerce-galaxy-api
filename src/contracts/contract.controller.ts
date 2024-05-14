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

import { Contract } from './schemas/contract.schema'
import { NewContractDto } from './dtos/create-contract.dto'
import { UpdateContractDto } from './dtos/update-contract.dto'
import { ContractService } from './contract.service'
import { ContractResponseDto } from './dtos/contract.response.dto'

import { ObjectIdDto } from 'src/common/dtos/object-id.dto'
import { AuthGuard } from '../auth/auth.guard'
import { PoliciesGuard } from '../casl/policies.guard'
import { CheckPolicies } from 'src/casl/policies.decorator'
import { ActionEnum } from 'src/casl/action.enum'
import { AppAbility } from 'src/casl/casl-ability.factory'
import { plainToInstance } from 'class-transformer'
import { DtoInterceptor } from '../common/dto-converter.interceptor'

@ApiTags('contracts')
@Controller('contracts')
@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<ContractResponseDto>(ContractResponseDto))
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class ContractController {
    constructor(
        private readonly contractService: ContractService,
    ) { }

    @Get()
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Contract))
    @ApiOkResponse({ type: [Contract] })
    public async getAllContracts(): Promise<Contract[]> {
        return this.contractService.findAll();
    }

    @Get(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Contract))
    @ApiOkResponse({ type: Contract })
    public async getContractById(@Param() objectIdDto: ObjectIdDto): Promise<Contract> {
        return this.contractService.findOne(objectIdDto.id);
    }

    @Post()
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Contract))
    @ApiOkResponse({ type: Contract })
    @ApiBadRequestResponse()
    public async createContract(@Body() newContractDto: NewContractDto): Promise<Contract> {
        if (!newContractDto) {
            throw new BadRequestException('request invalid');
        }
        return this.contractService.create(newContractDto);
    }

    @Put(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Contract))
    @ApiOkResponse({ type: Contract })
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    public async updateContract(@Param() objectIdDto: ObjectIdDto, @Body() updateContractDto: UpdateContractDto): Promise<Contract> {
        if (!updateContractDto) {
            throw new BadRequestException('request invalid');
        }
        return this.contractService.update(objectIdDto.id, updateContractDto);
    }

    @Delete(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Contract))
    @ApiOkResponse({ type: Contract })
    @ApiInternalServerErrorResponse()
    public async deleteContract(@Param() objectIdDto: ObjectIdDto): Promise<Contract> {
        return this.contractService.delete(objectIdDto.id);
    }
}