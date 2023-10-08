import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectureFormComponent } from './architecture-form.component';

describe('AddtaskComponent', () => {
  let component: ArchitectureFormComponent;
  let fixture: ComponentFixture<ArchitectureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchitectureFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchitectureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
