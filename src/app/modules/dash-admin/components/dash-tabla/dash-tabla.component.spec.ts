import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTablaComponent } from './dash-tabla.component';

describe('DashTablaComponent', () => {
  let component: DashTablaComponent;
  let fixture: ComponentFixture<DashTablaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashTablaComponent]
    });
    fixture = TestBed.createComponent(DashTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
