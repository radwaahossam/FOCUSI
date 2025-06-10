import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentAdviceComponent } from './parent-advice.component';

describe('ParentAdviceComponent', () => {
  let component: ParentAdviceComponent;
  let fixture: ComponentFixture<ParentAdviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentAdviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
