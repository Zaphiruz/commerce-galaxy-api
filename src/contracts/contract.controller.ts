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

import { Contract } from './contract.entity'
import { NewContractDto } from './new-contract.dto'
import { UpdateContractDto } from './update-contract.dto'
import { ObjectIdDto } from 'src/common/object-id.dto'
import { ContractService } from './contract.service'

@ApiTags('contracts')
@Controller('contracts')
export class ContractController {
    constructor(
        private readonly contractService: ContractService,
    ) { }

    @Get()
    @ApiOkResponse({ type: [Contract] })
    public async getAllContracts(): Promise<Contract[]> {
        return this.contractService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: Contract })
    public async getContractById(@Param() objectIdDto: ObjectIdDto): Promise<Contract> {
        return this.contractService.findOne(objectIdDto.id);
    }

    @Post()
    @ApiOkResponse({ type: Contract })
    @ApiBadRequestResponse()
    public async createContract(@Body() newContractDto: NewContractDto): Promise<Contract> {
        if (!newContractDto) {
            throw new BadRequestException('request invalid');
        }
        return this.contractService.create(newContractDto);
    }

    @Put(':id')
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
    @ApiOkResponse({ type: Contract })
    @ApiInternalServerErrorResponse()
    public async deleteContract(@Param() objectIdDto: ObjectIdDto): Promise<Contract> {
        return this.contractService.delete(objectIdDto.id);
    }
}