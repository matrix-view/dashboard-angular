import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarAreaChartExampleComponent } from './polar-area-chart-example.component';

describe('PolarAreaChartExampleComponent', () => {
  let component: PolarAreaChartExampleComponent;
  let fixture: ComponentFixture<PolarAreaChartExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolarAreaChartExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PolarAreaChartExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
