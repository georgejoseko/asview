import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsystemComponent } from './addsystem.component';

describe('AddsystemComponent', () => {
  let component: AddsystemComponent;
  let fixture: ComponentFixture<AddsystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
