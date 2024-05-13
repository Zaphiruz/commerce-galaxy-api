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
} from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger'

import { User } from './schemas/user.schema'
import { NewUserDto } from './dtos/new-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { ObjectIdDto } from '../common/object-id.dto'
import { UserService } from './user.service'
import { AuthGuard } from '../auth/auth.guard'
import { PoliciesGuard } from '../casl/policies.guard'
import { CheckPolicies } from 'src/casl/policies.decorator'
import { ActionEnum } from 'src/casl/action.enum'
import { AppAbility } from 'src/casl/casl-ability.factory'

@UseGuards(AuthGuard, PoliciesGuard)
@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Get()
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, User))
    @ApiOkResponse({ type: [User] })
    public async getAllUsers(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, User))
    @ApiOkResponse({ type: User })
    public async getUserById(@Param() objectIdDto: ObjectIdDto): Promise<User> {
        return this.userService.findOne(objectIdDto.id);
    }

    @Post()
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Create, User))
    @ApiOkResponse({ type: User })
    @ApiBadRequestResponse()
    public async createUser(@Body() newUserDto: NewUserDto): Promise<User> {
        if (!newUserDto) {
            throw new BadRequestException('request invalid');
        }
        if (await this.userService.findByUsername(newUserDto.username)) {
            throw new BadRequestException('username in use');
        }
        return this.userService.create(newUserDto);
    }

    @Put(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Update, User))
    @ApiOkResponse({ type: User })
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    public async updatePlanet(@Param() objectIdDto: ObjectIdDto, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        if (!updateUserDto) {
            throw new BadRequestException('request invalid');
        }
        return this.userService.update(objectIdDto.id, updateUserDto);
    }

    @Delete(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Delete, User))
    @ApiOkResponse({ type: User })
    @ApiInternalServerErrorResponse()
    public async deletePlanet(@Param() objectIdDto: ObjectIdDto): Promise<User> {
        return this.userService.delete(objectIdDto.id);
    }
}