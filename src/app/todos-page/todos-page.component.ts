import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.css'],
})
export class TodosPageComponent implements OnInit {
  // HttpClient servis uygulmadan axios service gibi veri çekmemizi sağlayan bir servis görevi görür.
  // Angularda servislere constructor üzerinden erişim yapabiliyoruz.
  // private dersek sadece typescript tarafından servise erişebiliriz
  // public tanımlarsak servis template den de erişilebilir olur.

  constructor(private http: HttpClient, public router: Router) {}

  // ! ile undefined olabilir diye bir tanımlama yaptım
  todos$!: Observable<ITodo[]>;
  searchText!: string;
  // Observable apidan gelecek bir değer olduğu için observable tanımladık.
  // apidan veri çekerken observable olan değişkenlerin sonuna$ ifadesi yazarız.

  loadTodos() {
    return this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  ngOnInit(): void {
    // sayfa ilk yüklendiği anda burası 1 kere tetiklenir. sayfa açılınca bir veri çekecek isek jquery.ready() benzer burada o veri çekme işlemini yaparız.
    // 1 kereye mahsus çalışır apidan veri bu method içeerisinde çekilir.

    // sayfa ilk açılışında hepsini yükle
    this.todos$ = this.loadTodos();
  }

  onSearch(value: string) {
    console.log('value', value);
    this.searchText = value;

    // aramak için searchtex en az 3 karakter yazılmış ise
    if (this.searchText.length > 3) {
      this.todos$ = this.todos$.pipe(
        map((response) => {
          // map operatörü ile yakalanan veriyi farklı bir formatta döndürdük filtereledik filtrelenmiş halini döndürdük.
          console.log('response', response);
          return response.filter((x) =>
            // aramları büyük küçük harf duyarlı hale getirdik.
            new RegExp(this.searchText, 'i').test(x.title)
          );
        })
      );
    } else if (this.searchText.length == 0) {
      // arama çubuğundaki arama temizlenince hepsini yükle
      this.todos$ = this.loadTodos();
    }
  }

  Delete(id: number) {
    // silincecek id si listede olmayanları filtrele dedik.
    this.todos$ = this.todos$.pipe(
      map((response) => {
        return response.filter((x) => x.id != id);
      })
    );
  }

  Edit(id: number) {
    const editModel$ = this.todos$.pipe(
      map((response) => {
        return response.find((x) => x.id == id);
      })
    );

    // takip edilecek nesnedye typescript tarafında erişmek istersek async pipe olmadığından async pipe arayüzde kullanıyoruz
    // subscribe methodu ile editlenen nesnedye bağlanıyoruz.
    editModel$.subscribe((value) => {
      console.log('editlenecek değer', value);
    });
  }
}
