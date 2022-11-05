import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsyststComponent } from './addsystst.component';

describe('AddsyststComponent', () => {
  let component: AddsyststComponent;
  let fixture: ComponentFixture<AddsyststComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsyststComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsyststComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
