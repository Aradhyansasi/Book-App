import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagenotfountComponent } from './pagenotfount.component';

describe('PagenotfountComponent', () => {
  let component: PagenotfountComponent;
  let fixture: ComponentFixture<PagenotfountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagenotfountComponent]
    });
    fixture = TestBed.createComponent(PagenotfountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
