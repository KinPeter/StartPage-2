import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevToComponent } from './dev-to.component';

describe('DevToComponent', () => {
  let component: DevToComponent;
  let fixture: ComponentFixture<DevToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevToComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
