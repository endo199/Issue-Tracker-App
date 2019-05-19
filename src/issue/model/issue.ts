import { IsString, IsNotEmpty } from 'class-validator';
import { Comment } from './comment';

export class Issue {
    id?: number;
    
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    postDate: Date = new Date();
    author: string;
    closed?: Date;

    comments: Comment[] = [];

    constructor(title?: string, description?: string) {
        this.title = title;
        this.description = description;
    }
}
