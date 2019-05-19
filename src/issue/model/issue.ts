export class Issue {
    id?: number;
    title: string;
    description: string;
    postDate: Date = new Date();
    author: string;
    closed?: Date;

    constructor(title?: string, description?: string) {
        this.title = title;
        this.description = description;
    }
}
