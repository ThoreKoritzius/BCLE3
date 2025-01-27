import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmSelectionComponent } from './bm-selection.component';

describe('BmSelectionComponent', () => {
  let component: BmSelectionComponent;
  let fixture: ComponentFixture<BmSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BmSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
