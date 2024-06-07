import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../models/todo';
import { TodosService } from '../services/todos.service';
import { take } from 'rxjs';
import { CardModule } from '@progress/kendo-angular-layout';
import { CheckBoxModule } from '@progress/kendo-angular-inputs';
import { IconsModule } from '@progress/kendo-angular-icons';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, CardModule, CheckBoxModule, IconsModule],
  styles: `
  kendo-card-body {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  kendo-checkbox {
    margin-right: 40px; 
  }
  .todo-text--completed {
    text-decoration-line: line-through;
  }
  `,
  template: `
      <link
      rel="stylesheet"
      href="https://unpkg.com/@progress/kendo-font-icons/dist/index.css"
    />

    <kendo-card width="400" class="todo"><kendo-card-body>
      <kendo-checkbox
        class="todo-btn"
        aria-label="toggle"
        [checkedState]="todo.completed"
        (click)="updateTodo()"
      ></kendo-checkbox>
      <h2
        class="todo-text"
        [ngClass]="todo.completed ? 'todo-text--completed' : ''"
      >
        {{ todo.text }}
      </h2>

      <kendo-icon name="trash" size="medium" (click)="deleteTodo()"></kendo-icon>


    </kendo-card-body></kendo-card>
  `
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;

  todosService = inject(TodosService);

  updateTodo() {
    this.todosService
      .updateTodo({ ...this.todo, completed: !this.todo.completed })
      .pipe(take(1))
      .subscribe();
  }

  deleteTodo() {
    this.todosService.deleteTodo(this.todo.id!).pipe(take(1)).subscribe();
  }
}
