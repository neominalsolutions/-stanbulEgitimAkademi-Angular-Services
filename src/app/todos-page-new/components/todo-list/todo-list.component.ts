import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { TodoService } from 'src/app/todos-page/todo.service';
import { TodoStateService } from '../../todo-state.service';
import { ITodo } from '../../todos-page-new.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos$!: Observable<ITodo[]>;
  @Input() todos: ITodo[] = []; // page de veri çekeriz sonrada page kullanan componentlere veri çekildikten sonra veriyi göndeririz.
  searchText!: string;

  constructor(
    private todoStateService: TodoStateService,
    private todoService: TodoService
  ) {
    //state dinle stateden gelen değeri listeye ekle
    this.todoStateService.todoState.subscribe((state: any) => {
      if (state != null) {
        // event dinleme işlemi
        console.log('state-change', state);

        if (state.type == 'TODO/ADD') {
          this.todos = [state.payload, ...this.todos];
        } else if (state.type == 'TODO/UPDATE') {
          this.todos.map((item) => {
            if (item.id == state.payload.id) {
              item.completed = state.payload.completed;
              item.title = state.payload.title;
            }
            return item;
          });
        }
      }
    });
  }

  onSearch(value: string) {
    console.log('value', value);
    this.searchText = value;

    // aramak için searchtex en az 3 karakter yazılmış ise
    if (this.searchText.length > 3) {
      // referans güncelleme işlemleri
      // angular change detector obje ve dizi ile çalışırken bu referans güncelleme spread operatörü sayesinde view günceller.
      this.todos = [
        ...this.todos.filter((x) =>
          // aramları büyük küçük harf duyarlı hale getirdik.
          new RegExp(this.searchText, 'i').test(x.title)
        ),
      ];
    } else if (this.searchText.length == 0) {
      // arama çubuğundaki arama temizlenince hepsini yükle
      this.todoService.loadTodos().subscribe((response) => {
        this.todos = [...response];
      });
    }
  }

  Delete(id: number) {
    this.todos = [...this.todos.filter((x) => x.id != id)];

    // apidan da silmek
    // api tarafındaki kodların çalışması için subscribe methodunu çağırıyoruz.
    this.todoService.deleteTodo(id).subscribe();
  }

  Edit(id: number) {
    const selectedTodo: any = this.todos.find((x) => x.id == id);
    this.todoStateService.openEditModal();
    this.todoStateService.selectTodo(selectedTodo);
  }

  AddNew() {
    this.todoStateService.openAddModal();
  }
}
