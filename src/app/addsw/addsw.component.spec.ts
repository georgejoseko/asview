import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddswComponent } from './addsw.component';

describe('AddswComponent', () => {
  let component: AddswComponent;
  let fixture: ComponentFixture<AddswComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddswComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
