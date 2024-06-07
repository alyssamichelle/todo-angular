import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../models/todo';
import { TodosService } from '../services/todos.service';
import { take } from 'rxjs';
import { CardModule } from '@progress/kendo-angular-layout';
import { CheckBoxModule } from '@progress/kendo-angular-inputs';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, CardModule, CheckBoxModule],
  styles: `
  kendo-card-body {
    display: flex;
    flex-direction: row;
  }
  kendo-checkbox, .k-button {
    margin: 0 10px; 
  }
  .todo-text--completed {
    text-decoration-line: line-through;
  }
  `,
  template: `
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
      <button kendoButton class="todo-delete-btn" (click)="deleteTodo()">
        delete
      </button>
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
