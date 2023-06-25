import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtransactionsComponent } from './viewtransactions.component';

describe('ViewtransactionsComponent', () => {
  let component: ViewtransactionsComponent;
  let fixture: ComponentFixture<ViewtransactionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewtransactionsComponent]
    });
    fixture = TestBed.createComponent(ViewtransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
