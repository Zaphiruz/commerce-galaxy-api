import { OmitType, PartialType } from "@nestjs/swagger";
import { Note } from "./note.entity";

export class UpdateNoteDto extends PartialType(OmitType(Note, [])) { }