import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsUploadCreditRequestComponent } from './documents-upload-credit-request.component';

describe('DocumentsUploadCreditRequestComponent', () => {
  let component: DocumentsUploadCreditRequestComponent;
  let fixture: ComponentFixture<DocumentsUploadCreditRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsUploadCreditRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentsUploadCreditRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
