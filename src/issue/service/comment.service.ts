import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database.service';
import { Comment } from '../model/comment';

@Injectable()
export class CommentService {
    constructor(private db: DatabaseService) {}

    addComment(issueId: number, comment: Comment) {
        this.db.addComment(issueId, comment);
    }

    getComments(issueId: number, rowPerPage: number = 10, page: number = 1) {
        this.db.getComments(issueId, rowPerPage, page);
    }

    deleteComment(issueId: number, index: number) {
        this.db.deleteComment(issueId, index);
    }
}
