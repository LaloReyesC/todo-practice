export class Todo {

    constructor(taskName) {

        this.Id = new Date().getTime();
        this.TaskName = taskName;
        this.Completed = false;
        this.CreationDate = new Date();

    }

}