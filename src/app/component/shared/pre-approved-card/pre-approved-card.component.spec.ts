import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreApprovedCardComponent } from './pre-approved-card.component';

describe('PreApprovedCardComponent', () => {
  let component: PreApprovedCardComponent;
  let fixture: ComponentFixture<PreApprovedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreApprovedCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreApprovedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
