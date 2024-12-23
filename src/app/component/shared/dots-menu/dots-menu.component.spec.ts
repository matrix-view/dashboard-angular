import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotsMenuComponent } from './dots-menu.component';

describe('DotsMenuComponent', () => {
  let component: DotsMenuComponent;
  let fixture: ComponentFixture<DotsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DotsMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DotsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
