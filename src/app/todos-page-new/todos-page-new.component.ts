import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { finalize, from, map, Observable, of } from 'rxjs';
import { TodoService } from '../todos-page/todo.service';
import { TodoStateService } from './todo-state.service';

export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  templateUrl: './todos-page-new.component.html',
  styleUrls: ['./todos-page-new.component.css'],
})
export class TodosPageNewComponent implements OnInit {
  todoData: ITodo[] = [];

  editModalRef!: NgbModalRef;
  addModalRef!: NgbModalRef;

  @ViewChild('addModal') addModal!: NgbModal;
  @ViewChild('editModal') editModal!: NgbModal;

  constructor(
    public router: Router,
    private modalService: NgbModal,
    private todoService: TodoService,
    private todoStateService: TodoStateService
  ) {
    this.todoStateService.todoState.subscribe((state: any) => {
      if (state.type == 'TODO/OpenAddModal') {
        this.addModalRef = this.modalService.open(this.addModal);
      } else if (state.type == 'TODO/OpenEditModal') {
        this.editModalRef = this.modalService.open(this.editModal);
      }
      if (state.type == 'TODO/ADD') {
        // add işlemi sonrasında addModal Kapat
        this.addModalRef.close();
      } else if (state.type == 'TODO/UPDATE') {
        // update işlemi sonrasında editModal kapat
        this.editModalRef.close();
      }
    });
  }

  ngOnInit(): void {
    // sayfada veri çekilir yani page compoentlerde veri çekelim
    this.todoService.loadTodos().subscribe((data) => {
      this.todoData = [...data];
    });
  }
}
