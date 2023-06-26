import { Component, OnDestroy, ViewChild } from '@angular/core';
import { BooksService } from 'src/service/books.service';
import 'datatables.net'; 
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from "primeng/table";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnDestroy{

  first: number = 0;
  rows: number = 10;

  book_list: any[] = [];
  
  bookSubsciprtion = new Subscription

  displayedColumns: string[] = ['id', 'title', 'description', 'pageCount'];

  constructor(private bookservice:BooksService, 
              private router:Router,
              private messageService:MessageService,
              private confirmationService: ConfirmationService,){
    
  }

  ngOnInit(): void {

    this.bookSubsciprtion.add(this.bookservice.getBook().subscribe((response:any)=>{
      this.book_list = response;
    })
    );    
  }

  ngOnDestroy(): void {
    this.bookSubsciprtion.unsubscribe()
    
  }

  onSearchdata(table: Table, event: any) {
    table.filterGlobal((event.target.value as string), 'contains');
  }
  
  createbook(){
    this.router.navigate(["book/create"]);
  }

  updatebtn(id:any){
      this.router.navigateByUrl(`book/update/`, { state: { data: id } });
  }

  deletebtn(event:Event, id:any){  
  this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
       this.bookSubsciprtion.add(this.bookservice.deleteBook(id).subscribe((response:any)=>{
          this.messageService.add({ key: 'bc', severity: 'info', summary: 'Confirmed', detail: 'Book data deleted successfully' });
        }))
      },
      reject: () => {
          this.messageService.add({key: 'bc', severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
  });
    
  }

 

}
