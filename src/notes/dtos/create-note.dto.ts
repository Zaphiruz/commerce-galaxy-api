import { IsNotEmpty } from "class-validator";


export class NewNoteDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    date: string;
 }