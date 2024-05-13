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

import { User } from './user.entity'
import { NewUserDto } from './new-user.dto'
import { UpdaetUserDto } from './update-user.dto'
import { ObjectIdDto } from 'src/common/object-id.dto'
import { UserService } from './user.service'

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Get()
    @ApiOkResponse({ type: [User] })
    public async getAllUsers(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: User })
    public async getUserById(@Param() objectIdDto: ObjectIdDto): Promise<User> {
        return this.userService.findOne(objectIdDto.id);
    }

    @Post()
    @ApiOkResponse({ type: User })
    @ApiBadRequestResponse()
    public async createUser(@Body() newUserDto: NewUserDto): Promise<User> {
        if (!newUserDto) {
            throw new BadRequestException('request invalid');
        }
        return this.userService.create(newUserDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: User })
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    public async updatePlanet(@Param() objectIdDto: ObjectIdDto, @Body() updateUserDto: UpdaetUserDto): Promise<User> {
        if (!updateUserDto) {
            throw new BadRequestException('request invalid');
        }
        return this.userService.update(objectIdDto.id, updateUserDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: User })
    @ApiInternalServerErrorResponse()
    public async deletePlanet(@Param() objectIdDto: ObjectIdDto): Promise<User> {
        return this.userService.delete(objectIdDto.id);
    }
}