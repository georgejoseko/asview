import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstakeComponent } from './addstake.component';

describe('AddstakeComponent', () => {
  let component: AddstakeComponent;
  let fixture: ComponentFixture<AddstakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddstakeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddstakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
