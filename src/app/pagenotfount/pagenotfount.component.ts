import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pagenotfount',
  templateUrl: './pagenotfount.component.html',
  styleUrls: ['./pagenotfount.component.css']
})
export class PagenotfountComponent {
  constructor(private router:Router){}

  backtoBook(){
    this.router.navigate(["book/list"]);
  }

}
