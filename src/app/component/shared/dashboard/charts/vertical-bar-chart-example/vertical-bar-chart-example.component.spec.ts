import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalBarChartExampleComponent } from './vertical-bar-chart-example.component';

describe('VerticalBarChartExampleComponent', () => {
  let component: VerticalBarChartExampleComponent;
  let fixture: ComponentFixture<VerticalBarChartExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalBarChartExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerticalBarChartExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
