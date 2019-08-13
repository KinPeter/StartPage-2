import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TilesTabComponent } from './tiles-tab.component';

describe('TilesTabComponent', () => {
  let component: TilesTabComponent;
  let fixture: ComponentFixture<TilesTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TilesTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TilesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
