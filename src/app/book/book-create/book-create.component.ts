import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from 'src/service/books.service';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService } from "primeng/api";
import { map, Subscription } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { trim } from 'lodash';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit, OnDestroy {


  submitted: boolean = false;
  bookForm!: FormGroup;
  isAddMode: boolean = true;

  id = "";
  title_btn_state = "Add";
  processing = false;
  form_data: any = {};
  bookSubscription = new Subscription

  constructor(
    private bookservice: BooksService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.id = this.router.getCurrentNavigation()?.extras.state?.['data'];
    }

  ngOnInit(): void {

    this.bookForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.maxLength(30)]],
      description: [null, [Validators.required, Validators.maxLength(50)]],
      pageCount: [null, [Validators.required, Validators.min(10), Validators.max(250)]],
      excerpt: [null, Validators.maxLength(250)],
      publishDate: [null, [Validators.required, this.validateDate]]
    });

    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.title_btn_state = "Update";

      this.bookSubscription.add(this.bookservice.getoneBook(this.id).pipe(
        map((resp: any) => {
      
          this.bookForm.patchValue({
            id: resp.id,
            title: resp.title,
            description: resp.description,
            pageCount: resp.pageCount,
            excerpt: resp.excerpt,
            publishDate: new Date(resp.publishDate)
          });

          this.submitted = true;
        })
      ).subscribe());

    } else {
      this.title_btn_state = "Add";

    }

  }

  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe()
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

    this.bookForm.controls['title'].setValue(trim(this.bookForm.controls['title'].value));
    this.bookForm.controls['description'].setValue(trim(this.bookForm.controls['description'].value));
    this.bookForm.controls['excerpt'].setValue(trim(this.bookForm.controls['excerpt'].value));


    if (this.bookForm.invalid) {
      this.processing = false;
      return;
    }

    if (this.id != null) {
      this.bookSubscription.add(this.bookservice.updateBook(this.bookForm.value, this.id).subscribe(response => {
        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Book Updated successfully' });

        this.processing = false;

      }

      ));

    } else {
      this.bookSubscription.add(
        this.bookservice.createBook(this.bookForm.value).subscribe({
          next: (response) => {
            this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Book added successfully' });
            this.processing = false;
          },
          error: (error) => {
            this.messageService.add({ key: 'bc', severity: 'error', summary: 'Error', detail: 'An error occurred' });
            this.processing = false;
          }
        })
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
