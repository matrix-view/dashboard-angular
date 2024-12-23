import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveContractsTableComponent } from './active-contracts-table.component';

describe('ActiveContractsTableComponent', () => {
  let component: ActiveContractsTableComponent;
  let fixture: ComponentFixture<ActiveContractsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveContractsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveContractsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
