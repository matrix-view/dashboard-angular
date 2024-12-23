import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditRequestDetailViewComponent } from './credit-request-detail-view.component';

describe('PendingRequestDetailComponent', () => {
  let component: CreditRequestDetailViewComponent;
  let fixture: ComponentFixture<CreditRequestDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditRequestDetailViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditRequestDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
