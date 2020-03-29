import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateDashboardComponent } from './state-dashboard.component';

describe('StateDashboardComponent', () => {
  let component: StateDashboardComponent;
  let fixture: ComponentFixture<StateDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
