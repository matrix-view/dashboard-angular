import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDocumentsComponent } from './contract-documents.component';

describe('ContractDocumentsComponent', () => {
  let component: ContractDocumentsComponent;
  let fixture: ComponentFixture<ContractDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractDocumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
