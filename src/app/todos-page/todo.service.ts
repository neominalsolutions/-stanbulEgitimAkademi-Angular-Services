import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from './todos-page.component';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private httpClient: HttpClient) {}

  loadTodos(): Observable<ITodo[]> {
    return this.httpClient.get<ITodo[]>(
      'https://jsonplaceholder.typicode.com/todos'
    );
  }

  saveTodo(param: ITodo): Observable<any> {
    return this.httpClient.post(
      'https://jsonplaceholder.typicode.com/todos',
      param
    );
  }

  deleteTodo(id: number) {
    console.log('delete-id', id);
    return this.httpClient.delete(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
  }
}
