import { Injectable } from '@nestjs/common';
import { Issue } from './model/issue';
import { DatabaseService } from '../database.service';

@Injectable()
export class IssueService {
    constructor(private db: DatabaseService) {}

    get(id: number){
        return this.db.getIssue(id);
    }

    getAll(page: number, rowsPerPage: number = 10) {
        return this.db.getIssues(page, rowsPerPage);
    }

    create(issue: Issue) {
        return this.db.addIssue(issue);
    }

    update(issue: Issue) {
        this.db.updateIssue(issue);
    }

    delete(id: number) {
        this.db.deleteIssue(id);
    }
}
