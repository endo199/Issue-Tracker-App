import { Controller, Post, Param, Body, Delete, UseInterceptors } from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { Comment } from '../model/comment';
import { UserInterceptor } from '../../directive/user.interceptor';
import { CommentPipe } from '../directive/comment.pipe';

@Controller('issue/:issue/comment')
@UseInterceptors(UserInterceptor)
export class CommentController {
    constructor(private commentService: CommentService) {}

    @Post()
    addComment(@Param('issue') issueId: number, @Body(CommentPipe) comment: Comment) {
        return this.commentService.addComment(issueId, comment);
    }

    @Delete(':index')
    deleteComment(@Param('issue') issueId: number, @Param('index') index: number) {
        return this.commentService.deleteComment(issueId, index);
    }
}
