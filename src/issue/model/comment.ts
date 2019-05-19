import { IsString, IsNotEmpty } from "class-validator";

export class Comment {
    id?: number;
    author: string;

    @IsString()
    @IsNotEmpty()
    comment: string;

    postDate: Date = new Date();
}
