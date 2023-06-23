import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@NgModule({
  declarations: [
    BookComponent,
    BookListComponent,
    BookCreateComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    HttpClientModule,
    InputTextModule,
    TableModule,
    ButtonModule,
    InputTextareaModule,
    FormsModule,
    InputNumberModule,
    CalendarModule,
    ReactiveFormsModule,
    ToastModule,
    PaginatorModule,
    ConfirmPopupModule
    
  ],
  providers: [MessageService, ConfirmationService],
})
export class BookModule { }
