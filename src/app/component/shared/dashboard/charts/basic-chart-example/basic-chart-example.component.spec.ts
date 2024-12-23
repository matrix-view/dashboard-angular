import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicChartExampleComponent } from './basic-chart-example.component';

describe('BasicChartExampleComponent', () => {
  let component: BasicChartExampleComponent;
  let fixture: ComponentFixture<BasicChartExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicChartExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasicChartExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
