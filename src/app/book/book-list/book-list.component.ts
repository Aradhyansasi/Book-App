import { Component, ViewChild } from '@angular/core';
import { BooksService } from 'src/service/books.service';
import 'datatables.net'; 
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from "primeng/table";


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {

  first: number = 0;
  rows: number = 10;

  book_list: any[] = [];
  book_list1: any[] = [];

  displayedColumns: string[] = ['id', 'title', 'description', 'pageCount'];

  constructor(private bookservice:BooksService, 
              private router:Router,
              private messageService:MessageService,
              private confirmationService: ConfirmationService,){
    
  }

  ngOnInit(): void {

    this.bookservice.getBook().subscribe((response:any)=>{
      this.book_list = response;
    });    
  }


  onSearchdata(table: Table, event: any) {
    table.filterGlobal((event.target.value as string), 'contains');
  }
  

  createbook(){
    this.router.navigate(["book/create"]);
  }

  updatebtn(id:any){
    
    this.router.navigate(["book/update/",id]);
  }

  deletebtn(event:Event, id:any){
    // console.log("event", event);
    // console.log("id:", id);
    
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bookservice.deleteBook(id).subscribe((response:any)=>{
          this.messageService.add({ key: 'bc', severity: 'info', summary: 'Confirmed', detail: 'Book data deleted successfully' });
        })
      },
      reject: () => {
          this.messageService.add({key: 'bc', severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
  });
    
  }

 

}
