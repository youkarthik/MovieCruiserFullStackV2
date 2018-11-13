import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaildialogComponent } from './detaildialog.component';

describe('DetaildialogComponent', () => {
  let component: DetaildialogComponent;
  let fixture: ComponentFixture<DetaildialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetaildialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaildialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
