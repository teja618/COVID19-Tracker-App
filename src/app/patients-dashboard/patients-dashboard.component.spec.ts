import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsDashboardComponent } from './patients-dashboard.component';

describe('PatientsDashboardComponent', () => {
  let component: PatientsDashboardComponent;
  let fixture: ComponentFixture<PatientsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
