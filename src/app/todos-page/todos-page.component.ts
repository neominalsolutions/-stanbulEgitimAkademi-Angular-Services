import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { finalize, from, map, Observable, of } from 'rxjs';
import { TodoService } from './todo.service';

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

  // rxjs nedir
  // httpclientModule
  // httpclient service
  // observable
  // subscribe
  // async pipe
  // sweatalert
  // ngb boostrap
  // new Regex
  // ngOninit
  // Constructor injection
  constructor(
    private http: HttpClient,
    public router: Router,
    private modalService: NgbModal,
    private todoService: TodoService
  ) {}

  editModalRef!: NgbModalRef;

  openModal(content: any) {
    // modalın açılmasını modelService.open() methodu sağlıyor
    this.editModalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  close() {
    this.editModalRef.close();
  }

  // ! ile undefined olabilir diye bir tanımlama yaptım
  todos$!: Observable<ITodo[]>; // apidan çekilecek olan verinin ilk hali, filtreleme sonucunda input temizlenirse ilk todos değerine geri dönmek için bunu kullandık.

  todos: ITodo[] = []; // arayüze yansıtılan todos verisi, filtereleme, ekdleme, çıkarma,silme,arama işlemleri bu nesne üzerinden yapılır
  searchText!: string;
  // Observable apidan gelecek bir değer olduğu için observable tanımladık.
  // apidan veri çekerken observable olan değişkenlerin sonuna$ ifadesi yazarız.

  loadTodos() {
    // buradaki kodları servislere çekiyoruz
    return this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  ngOnInit(): void {
    // sayfa ilk yüklendiği anda burası 1 kere tetiklenir. sayfa açılınca bir veri çekecek isek jquery.ready() benzer burada o veri çekme işlemini yaparız.
    // 1 kereye mahsus çalışır apidan veri bu method içeerisinde çekilir.

    // sayfa ilk açılışında hepsini yükle
    //this.todos$ = this.loadTodos(); // verinin ilk halini yükledik. Api nesnesi
    this.todos$ = this.todoService.loadTodos();
    // not eğer değişken $ile bitip observable tanımlanmış ise subsribe etmiyoruz. fakat veriyi aşağıdaki satırda ekrana basabilmek için bu sefer observable olan todo$ subscribe olduk
    this.todos$.subscribe((response) => {
      // observable olan verilere subsribe olup verinin son akışını todos dizisne aktardıl. axios.then gibi düşünebiliriz.
      // verinin ilk çekildiğindeki response'u todos dizi içerisine gösteri todos dizini arayüzde *ngFor ile döndük.
      this.todos = [...response];
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
      this.todos$.subscribe((response) => {
        this.todos = [...response];
      });
    }
  }

  // arayüzden ilgili değerin silinmesi işlemi
  Delete(id: number) {
    this.todos = [...this.todos.filter((x) => x.id != id)];

    // apidan da silmek
    // api tarafındaki kodların çalışması için subscribe methodunu çağırıyoruz.
    this.todoService.deleteTodo(id).subscribe();
  }

  visible: boolean = false;

  // document.getElementById('editModal')
  // editmodal referansına ulaşmamızı sağlayan bir teknik. $('#id')
  // idisinden ilgili componenti yakalamızı sağlar.
  @ViewChild('editModal') editModal!: NgbModal;

  // formlar ile çalışmamızı sağlayan bir teknik.
  // birden fazla form control ile çalışacağımız zaman FormGroup nesnesi tanımlarız.
  // FormControl nesnesi ile her bir inputun değeri eşleriz.
  EditForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    title: new FormControl('', [Validators.required, Validators.minLength(10)]),
    completed: new FormControl(false),
  });

  // edit butonuna basılınca editlenen formu ekranda gösterdik. modal içerisinde bu modal state den sorumlu kısım EditForm (Reactive Form yöntemi)

  // arayüzdeki değerlerin modala aktarılması içindi
  Edit(id: number) {
    const editModel: any = this.todos.find((x) => x.id == id);
    this.EditForm.patchValue(editModel);
    // edit forma editModel değerini gönderdim.
    this.openModal(this.editModal);
  }

  Update() {
    // update işlemlerinden map kullanalım
    this.todos.map((item) => {
      if (item.id == this.EditForm.value.id) {
        (item.completed = this.EditForm.get('completed')?.value),
          (item.title = this.EditForm.get('title')?.value);
      }
      return item;
    });

    this.EditForm.reset();
    this.editModalRef.close();
  }

  AddForm: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl('', [Validators.required, Validators.minLength(10)]),
    completed: new FormControl(false),
  });

  // idsinden elementin referansına erişiyorduk
  @ViewChild('addModal') addModal!: NgbModal;

  addModalRef!: NgbModalRef;

  AddNew() {
    // private modalService: NgbModal
    this.addModalRef = this.modalService.open(this.addModal);
  }

  // kaydet butonuna basınca listeye yeni bir item girmemiz gerekiyor.
  AddItem() {
    console.log('add-item', this.AddForm.value);
    // ekleme işlemi sonrasında modalı kapadık

    // unique id değeri verdik.
    this.AddForm.value.id = Math.round(Math.random() * 200000);

    console.log('this.AddForm.value', this.AddForm.value);

    // listenin ilk elemanına form değerini ekledik.
    this.todos = [this.AddForm.value, ...this.todos];

    // api ye veri gönderme post işlemi
    // this.http
    //   .post('https://jsonplaceholder.typicode.com/todos', this.AddForm.value)
    //   .subscribe({
    //     next: (response) => {
    //       // promise then bloğu
    //       console.log('api-response', response);
    //     },
    //     error: (err) => {
    //       // promise catch bloğu
    //       console.log('err', err);
    //     },
    //     complete: () => {
    //       // promise finally bloğu
    //       this.addModalRef.close();
    //       // modal kapadık.
    //       // formu resetledik
    //       this.AddForm.reset();
    //     },
    //   });

    this.todoService.saveTodo(this.AddForm.value).subscribe({
      next: (response) => {
        // promise then bloğu
        console.log('api-response', response);
      },
      error: (err) => {
        // promise catch bloğu
        console.log('err', err);
      },
      complete: () => {
        // promise finally bloğu
        this.addModalRef.close();
        // modal kapadık.
        // formu resetledik
        this.AddForm.reset();
      },
    });

    // api post işlemi ile apiye this.AddForm.value gönder.
  }
}
