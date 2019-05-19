import { Test, TestingModule } from '@nestjs/testing';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';
import { DatabaseService } from '../database.service';
import { AuthService } from '../service/auth.service';
import { CommentService } from './service/comment.service';

describe('Issue Controller', () => {
  let controller: IssueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IssueController],
      providers: [DatabaseService, IssueService, AuthService, CommentService]
    }).compile();

    controller = module.get<IssueController>(IssueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
