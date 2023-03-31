import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosPageNewComponent } from './todos-page-new/todos-page-new.component';
import { TodosPageComponent } from './todos-page/todos-page.component';

const routes: Routes = [
  {
    path: 'todos',
    component: TodosPageComponent,
  },
  {
    path: 'todos-new',
    component: TodosPageNewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
