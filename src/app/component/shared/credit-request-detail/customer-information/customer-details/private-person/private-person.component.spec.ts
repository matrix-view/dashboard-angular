import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatePersonComponent } from './private-person.component';

describe('PrivatePersonComponent', () => {
  let component: PrivatePersonComponent;
  let fixture: ComponentFixture<PrivatePersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivatePersonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivatePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
