import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './unauthorize-page.component.html',
  styleUrls: ['./unauthorize-page.component.css'],
})
export class UnauthorizePageComponent {
  // angularda ts tarafında sayfalar arası yönlendirme için ROuter service kullandık
  constructor(private router: Router) {}

  fakeLogin() {
    localStorage.setItem('token', 'my-token');
    this.router.navigate(['/']); // login sonrası anasayfaya yönlendir.
  }

  fakeLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']); // logout sonrası anasayfaya yönlendir.
  }
}
