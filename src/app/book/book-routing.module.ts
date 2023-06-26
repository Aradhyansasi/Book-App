import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfountComponent } from '../pagenotfount/pagenotfount.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book.component';

const routes: Routes = [
  {
    path: '', component: BookComponent, children: [
      {
        path: "",
        redirectTo: 'list',
        pathMatch: "full"
      },
      {
        path: "list",
        component: BookListComponent,
      },
      {
        path: "create",
        component: BookCreateComponent,
      },
      {
        path: "update/:id",
        component: BookCreateComponent,
      },
      { 
        path: '**', pathMatch: 'full', 
        component: PagenotfountComponent
     },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
