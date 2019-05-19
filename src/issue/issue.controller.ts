import { Controller, Get, Param, Post, Body, Put, ForbiddenException, HttpCode, Delete, UseGuards,
    Headers, UnauthorizedException, NotFoundException, UsePipes, ValidationPipe,
    NotAcceptableException, ParseIntPipe} from '@nestjs/common';

import { mergeMap } from 'rxjs/operators';
import { iif, of, throwError, Observable } from 'rxjs';

import { IssueService } from './issue.service';
import { Issue } from './model/issue';
import { AuthGuard } from '../directive/auth.guard';
import { Utils } from '../util/utils';
import { IssuePipe } from './directive/issue.pipe';

@Controller('issue')
export class IssueController {
    constructor(private issueService: IssueService) {}

    @Get(':rowsPerPage/:page')
    getIssues(@Param('rowsPerPage', ParseIntPipe) rowsPerPage: number = 10, @Param('page', ParseIntPipe) page: number = 1) {
        return this.issueService.getAll(page, rowsPerPage);
    }

    @Get(':id')
    getIssue(@Param('id', ParseIntPipe) id: number) {
        return this.issueService.get(id).pipe(
            mergeMap(issue => iif(() => !!issue, of(issue), throwError(new NotFoundException('Issue not Found'))))
        );
    }

    @Post()
    @UseGuards(AuthGuard)
    createIssue(@Body(new IssuePipe()) issue: Issue, @Headers('authorization') auth: string) {
        const user = Utils.extractUsernameFromAuthHeader(auth);
        issue.author = user.username;

        return this.issueService.create(issue);
    }

    @Put(':id')
    @HttpCode(204)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    updateIssue(@Param('id', ParseIntPipe) id: number, @Body(new IssuePipe()) issue: Issue, @Headers('authorization') auth: string) {
        const user = Utils.extractUsernameFromAuthHeader(auth);
        issue.author = user.username;

        return this.issueService.get(id).pipe(
            mergeMap(oldIssue => iif(
                () => !!oldIssue, 
                Observable.create((observer) => {
                    if (oldIssue.author !== issue.author) {
                        observer.error(new UnauthorizedException(`You are not allowed to update this issue`));
                    } else if (oldIssue.closed) {
                        console.log('XXX issue is already closed');
                        observer.error(new ForbiddenException('Issue already closed'));
                    }

                    const update = Object.assign({}, oldIssue, issue);
                    this.issueService.update(update);
                    
                    observer.complete();
                }),
                throwError(new NotFoundException('Issue not Found'))
            ))
        );
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(AuthGuard)
    deleteIssue(@Param('id', ParseIntPipe) id: number, @Headers('authorization') auth: string) {
        const user = Utils.extractUsernameFromAuthHeader(auth);
        return this.issueService.get(id).pipe(
            mergeMap(oldIssue => iif(
                () => !!oldIssue, 
                Observable.create((observer) => {
                    if (oldIssue.author !== user.username) {
                        observer.error(new UnauthorizedException(`You are not allowed to delete this issue`));
                    } else if (oldIssue.closed) {
                        console.log('XXX issue is already closed');
                        observer.error(new ForbiddenException('Closed issue can\'t be deleted'));
                    }

                    this.issueService.delete(id);
                    
                    observer.complete();
                }),
                throwError(new NotFoundException('Issue not Found'))
            ))
        );
    }

    @Put(':id/close')
    closeIssue(@Param('id', ParseIntPipe) id: number, @Headers('authorization') auth: string) {
        const user = Utils.extractUsernameFromAuthHeader(auth);
        return this.issueService.get(id).pipe(
            mergeMap(oldIssue => iif(
                () => !!oldIssue, 
                Observable.create((observer) => {
                    if (oldIssue.author !== user.username) {
                        observer.error(new UnauthorizedException(`You are not allowed to close this issue`));
                    } else if (oldIssue.closed) {
                        console.log('XXX issue is already closed');
                        observer.error(new NotAcceptableException(`It's already closed at ${oldIssue.closed.toISOString()}`));
                    }

                    oldIssue.closed = new Date();

                    this.issueService.update(oldIssue);
                    
                    observer.complete();
                }),
                throwError(new NotFoundException('Issue not Found'))
            ))
        );
    }
}
