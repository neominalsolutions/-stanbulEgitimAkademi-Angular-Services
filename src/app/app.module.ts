import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TodosPageComponent } from './todos-page/todos-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TodosPageNewComponent } from './todos-page-new/todos-page-new.component';
import { TodoAddComponent } from './todos-page-new/components/todo-add/todo-add.component';
import { TodoEditComponent } from './todos-page-new/components/todo-edit/todo-edit.component';
import { TodoListComponent } from './todos-page-new/components/todo-list/todo-list.component';
// angularda veri çekme işlemi yapabilir. Aynı axios gibi get,post,put,delete isteklerini atabiliriz.

// 1. işlem HttpClientModule appModule import etmek
// 2. işlem HttpClient service constructora yazma
// 3. işlem component içinde observable bir veri tipi tanımlama veri$
// 4. işlem gelen veriyi view'de async pipe ile karşılamak.

@NgModule({
  declarations: [AppComponent, TodosPageComponent, TodosPageNewComponent, TodoAddComponent, TodoEditComponent, TodoListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule, // ngModel tanımı için Forms module ihtiyacımız var
    SweetAlert2Module.forRoot(), // 3rd yüklenen programları appmodule import ediyoruz.
    ReactiveFormsModule, // React Hooks Form
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
