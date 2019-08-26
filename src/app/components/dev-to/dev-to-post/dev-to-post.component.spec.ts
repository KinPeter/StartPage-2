import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevToPostComponent } from './dev-to-post.component';

describe('DevToPostComponent', () => {
  let component: DevToPostComponent;
  let fixture: ComponentFixture<DevToPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevToPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevToPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
