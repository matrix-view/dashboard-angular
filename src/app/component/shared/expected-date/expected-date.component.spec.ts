import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectedDateComponent } from './expected-date.component';

describe('ExpectedDateComponent', () => {
  let component: ExpectedDateComponent;
  let fixture: ComponentFixture<ExpectedDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpectedDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpectedDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
