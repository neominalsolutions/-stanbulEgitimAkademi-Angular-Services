import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITodo } from './todos-page-new.component';

@Injectable({
  providedIn: 'root',
})
export class TodoStateService {
  // redux todos yapısı

  // todoların load edilmesi işlemi var
  // todo add yapıldığında todolistesine add action sonucunda payload ekleme işlemi var

  // Observable dan farklı Subject denilen bir servis ise componentler arasındaki bu haberleşmeyi sağlıyoruz.

  // redux daki initialstate
  public todoState = new BehaviorSubject<any>(null);
  // todoState değişiminde ilgili state bağlanıp state gönderilen değeri dinleyeceğiz.
  // componentler veri dinlemek için todoState service subsribe oluyor
  // react bunun useSelector() hook kullanıyorduk.

  addTodo(todo: ITodo) {
    console.log('eklenecek gönderildi', todo);
    // React state güncellenemsini reducer yapıyordu
    // Angularda next ile oluyor.
    this.todoState.next({ type: 'TODO/ADD', payload: todo });
  }

  selectTodo(todo: ITodo) {
    this.todoState.next({ type: 'TODO/SELECT', payload: todo });
  }

  updateTodo(todo: ITodo) {
    this.todoState.next({ type: 'TODO/UPDATE', payload: todo });
  }

  openAddModal() {
    this.todoState.next({ type: 'TODO/OpenAddModal', payload: null });
  }

  openEditModal() {
    this.todoState.next({ type: 'TODO/OpenEditModal', payload: null });
  }

  constructor() {}
}
