import { Component } from '@angular/core';

type TaskStatus = 'To Do' | 'In Progress' | 'Done';

interface TaskCard {
  id: number;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: TaskStatus;
}

interface BoardColumn {
  title: TaskStatus;
  tasks: TaskCard[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly columns: BoardColumn[] = [
    {
      title: 'To Do',
      tasks: [
        {
          id: 1,
          title: 'Design board UI',
          description: 'Create the initial three-column Kanban layout.',
          priority: 'Medium',
          status: 'To Do'
        }
      ]
    },
    {
      title: 'In Progress',
      tasks: [
        {
          id: 2,
          title: 'Build task API',
          description: 'Connect the Angular board to Express endpoints.',
          priority: 'High',
          status: 'In Progress'
        }
      ]
    },
    {
      title: 'Done',
      tasks: [
        {
          id: 3,
          title: 'Initialize backend',
          description: 'Set up Express, PostgreSQL schema, and task routes.',
          priority: 'Low',
          status: 'Done'
        }
      ]
    }
  ];
}
