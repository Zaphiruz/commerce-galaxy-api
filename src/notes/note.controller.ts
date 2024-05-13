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

import { Note } from './note.entity'
import { NewNoteDto } from './new-note.dto'
import { UpdateNoteDto } from './update-note.dto'
import { ObjectIdDto } from 'src/common/dtos/object-id.dto'
import { NoteService } from './note.service'

@ApiTags('notes')
@Controller('notes')
export class NoteController {
    constructor(
        private readonly noteService: NoteService,
    ) { }

    @Get()
    @ApiOkResponse({ type: [Note] })
    public async getAllNotes(): Promise<Note[]> {
        return this.noteService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: Note })
    public async getNoteById(@Param() objectIdDto: ObjectIdDto): Promise<Note> {
        return this.noteService.findOne(objectIdDto.id);
    }

    @Post()
    @ApiOkResponse({ type: Note })
    @ApiBadRequestResponse()
    public async createNote(@Body() newNoteDto: NewNoteDto): Promise<Note> {
        if (!newNoteDto) {
            throw new BadRequestException('request invalid');
        }
        return this.noteService.create(newNoteDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: Note })
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    public async updatePlanet(@Param() objectIdDto: ObjectIdDto, @Body() updateNoteDto: UpdateNoteDto): Promise<Note> {
        if (!updateNoteDto) {
            throw new BadRequestException('request invalid');
        }
        return this.noteService.update(objectIdDto.id, updateNoteDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: Note })
    @ApiInternalServerErrorResponse()
    public async deletePlanet(@Param() objectIdDto: ObjectIdDto): Promise<Note> {
        return this.noteService.delete(objectIdDto.id);
    }
}