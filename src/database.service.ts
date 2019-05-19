import { Injectable } from '@nestjs/common';
import { Issue } from './issue/model/issue';
import { Comment } from './issue/model/comment';
import { of, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class DatabaseService {
    private issues = {
        999: {
            id: 999,
            title: 'title 1',
            description: 'This is description',
            postDate: new Date(),
            author: 'user1',
            comments: []
        }
    };

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

    // Comments
    addComment(issueId: number, comment: Comment) {
        this.issues[issueId].comments.splice(0, 0, comment);
        return of(comment);
    }
    deleteComment(issueId: number, index: number) {
        const deletedComment = this.issues[issueId].comments.splice(index, 1);
        return of(deletedComment[0]);
    }
    getComments(issueId: number, rowPerPage: number, page: number) {
        throw new Error("Method not implemented.");
    }
}
