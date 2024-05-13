import { OmitType } from "@nestjs/swagger";
import { Note } from "./note.entity";
import { IsNotEmpty } from "class-validator";

export class NewNoteDto extends OmitType(Note, []) { }