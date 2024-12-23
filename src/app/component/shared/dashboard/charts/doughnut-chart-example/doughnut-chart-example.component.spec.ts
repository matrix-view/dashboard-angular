import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutChartExampleComponent } from './doughnut-chart-example.component';

describe('DoughnutChartExampleComponent', () => {
  let component: DoughnutChartExampleComponent;
  let fixture: ComponentFixture<DoughnutChartExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoughnutChartExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoughnutChartExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
