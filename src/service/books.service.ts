import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BidiModule } from '@angular/cdk/bidi';
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { ɵPLATFORM_BROWSER_ID } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http:HttpClient) { }

  getBook() {
    const url = "https://fakerestapi.azurewebsites.net/api/v1/Books"
    return this.http.get<Response>(url)
  }
  
  createBook(bookdetails:any):Observable <any> {
    const url =  "https://fakerestapi.azurewebsites.net/api/v1/Books ";
    return this.http.post<Response>(url,bookdetails)
  }

  updateBook(bookdetails:any, b_id:any):Observable <any> {
    const url = " https://fakerestapi.azurewebsites.net/api/v1/Books/"+b_id
    return this.http.put<Response>(url,bookdetails)
  }

  getoneBook(b_id:any) {
    const url = " https://fakerestapi.azurewebsites.net/api/v1/Books/"+b_id
    return this.http.get<Response>(url)
  }

  deleteBook(b_id:any){
    const url = "https://fakerestapi.azurewebsites.net/api/v1/Books/"+b_id
    return this.http.delete<Response>(url)
  }

  
}
