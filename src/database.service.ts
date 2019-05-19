import { Injectable } from '@nestjs/common';
import { Issue } from './issue/model/issue';
import { of, Observable } from 'rxjs';

@Injectable()
export class DatabaseService {
    private issues = {};

    generateId(): number {
        return new Date().getTime();
    }

    getIssue(id: number): Observable<Issue> {
        return of(this.issues[id]);
    }

    getIssues(page: number, rowsPerPage: number): Observable<Issue[]> {
        const entries = Object.entries(this.issues);
        const startIndex = (page - 1) * rowsPerPage;
        return of(entries.slice(startIndex, rowsPerPage).map(entry => entry[1]) as Issue[]);
    }

    addIssue(issue: Issue): Observable<number> {
        const id = this.generateId();
        issue.id = id;
        this.issues[id] = issue;

        return of(id);
    }

    updateIssue(issue: Issue) {
        this.issues[issue.id] = issue;
    }

    deleteIssue(id: number) {
        const issue: Issue = this.issues[id];
        delete(this.issues[id]);

        return of(issue);
    }
}
