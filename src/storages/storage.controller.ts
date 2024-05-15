import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

import { Storage } from './schemas/storage.schema';
import { NewStorageDto } from './dtos/create-storage.dto';
import { UpdateStorageDto } from './dtos/update-storage.dto';
import { StorageService } from './storage.service';
import { StorageResponseDto } from 'src/storages/dtos/storage.response.dto';

import { ObjectIdDto } from 'src/common/dtos/object-id.dto';
import { AuthGuard } from '../auth/auth.guard';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from 'src/casl/policies.decorator';
import { ActionEnum } from 'src/casl/action.enum';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { DtoInterceptor } from '../common/dto-converter.interceptor';

@ApiTags('storages')
@Controller('storages')
@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<StorageResponseDto>(StorageResponseDto))
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Storage))
  @ApiOkResponse({ type: [Storage] })
  public async getAllStorages(): Promise<Storage[]> {
    return this.storageService.findAll();
  }

  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Storage))
  @ApiOkResponse({ type: Storage })
  public async getStorageById(
    @Param() objectIdDto: ObjectIdDto,
  ): Promise<Storage> {
    return this.storageService.findOne(objectIdDto.id);
  }

  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Storage))
  @ApiOkResponse({ type: Storage })
  @ApiBadRequestResponse()
  public async createStorage(
    @Body() newStorageDto: NewStorageDto,
  ): Promise<Storage> {
    if (!newStorageDto) {
      throw new BadRequestException('request invalid');
    }
    return this.storageService.create(newStorageDto);
  }

  @Put(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Storage))
  @ApiOkResponse({ type: Storage })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  public async updateStorage(
    @Param() objectIdDto: ObjectIdDto,
    @Body() updateStorageDto: UpdateStorageDto,
  ): Promise<Storage> {
    if (!updateStorageDto) {
      throw new BadRequestException('request invalid');
    }
    return this.storageService.update(objectIdDto.id, updateStorageDto);
  }

  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Storage))
  @ApiOkResponse({ type: Storage })
  @ApiInternalServerErrorResponse()
  public async deleteStorage(
    @Param() objectIdDto: ObjectIdDto,
  ): Promise<Storage> {
    return this.storageService.delete(objectIdDto.id);
  }
}
