import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmaSearchComponent } from './mma-search.component';

describe('MmaSearchComponent', () => {
  let component: MmaSearchComponent;
  let fixture: ComponentFixture<MmaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MmaSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MmaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
