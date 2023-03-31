import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoStateService } from '../../todo-state.service';
import { ITodo } from '../../todos-page-new.component';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css'],
})
export class TodoEditComponent {
  constructor(private todoStateService: TodoStateService) {
    todoStateService.todoState.subscribe((state: any) => {
      if (state != null) {
        if (state.type == 'TODO/SELECT') {
          this.EditForm.patchValue(state.payload);
        }
      }
    });
  }

  // formlar ile çalışmamızı sağlayan bir teknik.
  // birden fazla form control ile çalışacağımız zaman FormGroup nesnesi tanımlarız.
  // FormControl nesnesi ile her bir inputun değeri eşleriz.
  EditForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    title: new FormControl('', [Validators.required, Validators.minLength(10)]),
    completed: new FormControl(false),
  });

  Update() {
    console.log('edit-form', this.EditForm.value);
    this.todoStateService.updateTodo(this.EditForm.value as ITodo);
    this.EditForm.reset();
    // TODO/UPDATE payload EditForm.value
    // api git update servisi çalıştır.
  }
}
