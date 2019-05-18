import { Module } from '@nestjs/common';
import { IssueModule } from './issue/issue.module';
import { DatabaseService } from './database.service';

@Module({
  imports: [IssueModule],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
