import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { TodosPageNewComponent } from './todos-page-new/todos-page-new.component';
import { TodosPageComponent } from './todos-page/todos-page.component';
import { UnauthorizePageComponent } from './unauthorize-page/unauthorize-page.component';

// Admin Component girmek için login olmak gerekiyor
// localstorage da bir token değerinin olması gerekiyor.
// localStorage da token varsa artık oturum açtığımız için oturum açılınca giriş yapabildiğimiz sayfalara yönlenebildik.
// angularda da açılak sayfaları belirli bir kontrol durumuna göre açmak için guard dediğimiz özel servis yapıları var.

const routes: Routes = [
  {
    path: 'todos',
    component: TodosPageComponent,
    canActivate: [AuthGuard], // Authorize Attribute
    // sayfayı açıcağın zaman bunu bir kontrolden geçir.
  },
  {
    path: 'todos-new',
    component: TodosPageNewComponent,
  },
  {
    path: 'unauthorized',
    component: UnauthorizePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
