import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddswtstComponent } from './addswtst.component';

describe('AddswtstComponent', () => {
  let component: AddswtstComponent;
  let fixture: ComponentFixture<AddswtstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddswtstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddswtstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
