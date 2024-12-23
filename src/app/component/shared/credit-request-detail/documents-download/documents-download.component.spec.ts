import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsDownloadComponent } from './documents-download.component';

describe('DocumentsDownloadComponent', () => {
  let component: DocumentsDownloadComponent;
  let fixture: ComponentFixture<DocumentsDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsDownloadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentsDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
