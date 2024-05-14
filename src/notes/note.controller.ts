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

import { Note } from './schemas/note.schema'
import { NewNoteDto } from './dtos/create-note.dto'
import { UpdateNoteDto } from './dtos/update-note.dto'
import { NoteService } from './note.service'
import { NoteResponseDto } from './dtos/notes.response.dto'

import { ObjectIdDto } from 'src/common/dtos/object-id.dto'
import { AuthGuard } from '../auth/auth.guard'
import { PoliciesGuard } from '../casl/policies.guard'
import { CheckPolicies } from 'src/casl/policies.decorator'
import { ActionEnum } from 'src/casl/action.enum'
import { AppAbility } from 'src/casl/casl-ability.factory'
import { plainToInstance } from 'class-transformer'
import { DtoInterceptor } from '../common/dto-converter.interceptor'

@ApiTags('notes')
@Controller('notes')
@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<NoteResponseDto>(NoteResponseDto))
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class NoteController {
    constructor(
        private readonly noteService: NoteService,
    ) { }

    @Get()
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Note))
    @ApiOkResponse({ type: [Note] })
    public async getAllNotes(): Promise<Note[]> {
        return this.noteService.findAll();
    }

    @Get(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Note))
    @ApiOkResponse({ type: Note })
    public async getNoteById(@Param() objectIdDto: ObjectIdDto): Promise<Note> {
        return this.noteService.findOne(objectIdDto.id);
    }

    @Post()
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Note))
    @ApiOkResponse({ type: Note })
    @ApiBadRequestResponse()
    public async createNote(@Body() newNoteDto: NewNoteDto): Promise<Note> {
        if (!newNoteDto) {
            throw new BadRequestException('request invalid');
        }
        return this.noteService.create(newNoteDto);
    }

    @Put(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Note))
    @ApiOkResponse({ type: Note })
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    public async updateNote(@Param() objectIdDto: ObjectIdDto, @Body() updateNoteDto: UpdateNoteDto): Promise<Note> {
        if (!updateNoteDto) {
            throw new BadRequestException('request invalid');
        }
        return this.noteService.update(objectIdDto.id, updateNoteDto);
    }

    @Delete(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Note))
    @ApiOkResponse({ type: Note })
    @ApiInternalServerErrorResponse()
    public async deleteNote(@Param() objectIdDto: ObjectIdDto): Promise<Note> {
        return this.noteService.delete(objectIdDto.id);
    }
}