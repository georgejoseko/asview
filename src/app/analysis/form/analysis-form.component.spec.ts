import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisFormComponent } from './analysis-form.component';

describe('AddtaskComponent', () => {
  let component: AnalysisFormComponent;
  let fixture: ComponentFixture<AnalysisFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
