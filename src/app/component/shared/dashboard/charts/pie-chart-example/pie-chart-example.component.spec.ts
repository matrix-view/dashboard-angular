import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartExampleComponent } from './pie-chart-example.component';

describe('PieChartExampleComponent', () => {
  let component: PieChartExampleComponent;
  let fixture: ComponentFixture<PieChartExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieChartExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PieChartExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
