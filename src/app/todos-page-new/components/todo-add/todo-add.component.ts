import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/todos-page/todo.service';
import { TodoStateService } from '../../todo-state.service';
import { ITodo } from '../../todos-page-new.component';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css'],
})
export class TodoAddComponent {
  constructor(
    private todoService: TodoService,
    private todoStateService: TodoStateService
  ) {}

  AddForm: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl('', [Validators.required, Validators.minLength(10)]),
    completed: new FormControl(false),
  });

  AddItem() {
    this.AddForm.value.id = Math.round(Math.random() * 200000);

    this.todoService.saveTodo(this.AddForm.value).subscribe({
      next: (response) => {
        console.log('api-response', response);
        this.todoStateService.addTodo(this.AddForm.value as ITodo);
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {
        this.AddForm.reset();
      },
    });
  }
}
