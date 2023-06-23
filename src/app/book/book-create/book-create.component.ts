import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/service/books.service';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService } from "primeng/api";
import { map } from 'rxjs';
import { AbstractControl, ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  excerpt: any
  description: any
  title: any
  pagecount!: number
  publishDate!: Date;

  submitted: boolean = false;
  bookForm!: FormGroup;

  isAddMode: boolean = true;

  id = "";
  title_btn_state = "Add";
  processing = false;
  form_data:any = {};

  constructor(
    private bookservice: BooksService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router :Router,
  ) { }

  

  ngOnInit(): void {

   

    this.bookForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.maxLength(30)]],
      description: [null, [Validators.required, Validators.maxLength(50)]],
      pageCount: [null, [Validators.required, Validators.min(10), Validators.max(250)]],
      excerpt: [null, Validators.maxLength(250)],
      publishDate: [null, [Validators.required, this.validateDate]]
    });

  
    

    this.id = this.route.snapshot.params["id"];
    console.log('idddd: ', this.id)
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.title_btn_state = "Update";
      console.log("hjgf", this.title_btn_state)

    

    this.bookservice.getoneBook(this.id).pipe(
      map((resp: any) => {
        console.log("response:", resp);
    
        this.bookForm.patchValue({
          id:resp.id,
          title: resp.title,
          description: resp.description,
          pageCount: resp.pageCount,
          excerpt: resp.excerpt,
          publishDate: new Date(resp.publishDate)
        });
    
        this.submitted = true;
      })
    ).subscribe();

    } else {
      this.title_btn_state = "Add";

    }

  }


  validateDate(control: AbstractControl): ValidationErrors | null {
    const selectedDate: Date = control.value;
    const currentDate: Date = new Date();
  
    if (selectedDate > currentDate) {
      return { futureDate: true };
    }
    return null;
  }

  add_update_book() {
    this.processing = true;
    this.submitted = true;


    if (this.bookForm.invalid) {
      this.processing = false;
      return;
    }
    
    
    if ( this.id != null) {
      console.log("edit")

      this.bookservice.updateBook(this.bookForm.value,  this.id).subscribe(response => {
        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Book Updated successfully' });
  
        this.processing = false;
        console.log("update response: ", response)
      
  
      }
       
      );

    }else{
      console.log("add");
      

    this.bookservice.createBook(this.bookForm.value).subscribe(response => {
      this.messageService.add({key: 'bc', severity: 'success', summary: 'Success', detail: 'Book added successfully' });

      this.processing = false;
      console.log("create response: ", response);
    },
    error => {
      this.messageService.add({key: 'bc', severity: 'error', summary: 'Error', detail: 'An error occurred' });
      this.processing = false;
      console.error("create error:", error);
    }
  );
   
  }
}

  cancelbook() { 
    this.router.navigate(["book/list"]);
  }

  get f() {
    return this.bookForm.controls;
  }
}
