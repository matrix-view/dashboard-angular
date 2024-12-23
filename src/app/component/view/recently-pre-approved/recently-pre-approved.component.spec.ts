import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyPreApprovedComponent } from './recently-pre-approved.component';

describe('RecentlyPreApprovedComponent', () => {
  let component: RecentlyPreApprovedComponent;
  let fixture: ComponentFixture<RecentlyPreApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentlyPreApprovedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentlyPreApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
