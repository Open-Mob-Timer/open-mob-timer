import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentPanelComponent } from './instrument-panel.component';

describe('InstrumentPanelComponent', () => {
  let component: InstrumentPanelComponent;
  let fixture: ComponentFixture<InstrumentPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumentPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
