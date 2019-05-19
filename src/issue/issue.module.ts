import { Module } from '@nestjs/common';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';
import { DatabaseService } from '../database.service';
import { AuthService } from '../service/auth.service';

@Module({
  controllers: [IssueController],
  providers: [DatabaseService, IssueService, AuthService]
})
export class IssueModule {}
