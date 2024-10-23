import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReducirStockComponent } from './reducir-stock.component';

describe('ReducirStockComponent', () => {
  let component: ReducirStockComponent;
  let fixture: ComponentFixture<ReducirStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReducirStockComponent]
    });
    fixture = TestBed.createComponent(ReducirStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
