import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDeliveryComponent } from './contract-delivery.component';

describe('ContractDeliveryComponent', () => {
  let component: ContractDeliveryComponent;
  let fixture: ComponentFixture<ContractDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractDeliveryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
