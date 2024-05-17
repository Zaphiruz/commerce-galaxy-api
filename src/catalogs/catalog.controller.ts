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

import { Catalog } from './schemas/catalog.schema';
import { NewCatalogDto } from './dtos/create-catalog.dto';
import { UpdateCatalogDto } from './dtos/update-catalog.dto';
import { CatalogService } from './catalog.service';
import { CatalogResponseDto } from './dtos/catalog.response.dto';

import { ObjectIdDto } from 'src/common/dtos/object-id.dto';
import { AuthGuard } from '../auth/auth.guard';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from 'src/casl/policies.decorator';
import { ActionEnum } from 'src/casl/action.enum';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { DtoInterceptor } from '../common/interceptors/dto-converter.interceptor';

@ApiTags('catalogs')
@Controller('catalogs')
@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<CatalogResponseDto>(CatalogResponseDto))
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Catalog))
  @ApiOkResponse({ type: [Catalog] })
  public async getAllCatalogs(): Promise<Catalog[]> {
    return this.catalogService.findAll();
  }

  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Catalog))
  @ApiOkResponse({ type: Catalog })
  public async getCatalogById(
    @Param() objectIdDto: ObjectIdDto,
  ): Promise<Catalog> {
    return this.catalogService.findOne(objectIdDto.id);
  }

  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Catalog))
  @ApiOkResponse({ type: Catalog })
  @ApiBadRequestResponse()
  public async createCatalog(
    @Body() newCatalogDto: NewCatalogDto,
  ): Promise<Catalog> {
    if (!newCatalogDto) {
      throw new BadRequestException('request invalid');
    }
    return this.catalogService.create(newCatalogDto);
  }

  @Put(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Catalog))
  @ApiOkResponse({ type: Catalog })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  public async updateCatalog(
    @Param() objectIdDto: ObjectIdDto,
    @Body() updateCatalogDto: UpdateCatalogDto,
  ): Promise<Catalog> {
    if (!updateCatalogDto) {
      throw new BadRequestException('request invalid');
    }
    return this.catalogService.update(objectIdDto.id, updateCatalogDto);
  }

  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Catalog))
  @ApiOkResponse({ type: Catalog })
  @ApiInternalServerErrorResponse()
  public async deleteCatalog(
    @Param() objectIdDto: ObjectIdDto,
  ): Promise<Catalog> {
    return this.catalogService.delete(objectIdDto.id);
  }
}
