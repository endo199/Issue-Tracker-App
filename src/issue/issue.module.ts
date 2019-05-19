import { Module } from '@nestjs/common';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';
import { DatabaseService } from '../database.service';
import { AuthService } from '../service/auth.service';
import { CommentController } from './controller/comment.controller';
import { CommentService } from './service/comment.service';

@Module({
  controllers: [IssueController, CommentController],
  providers: [DatabaseService, IssueService, AuthService, CommentService]
})
export class IssueModule {}
