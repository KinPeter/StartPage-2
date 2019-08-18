import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkResultsComponent } from './link-results.component';

describe('LinkResultsComponent', () => {
  let component: LinkResultsComponent;
  let fixture: ComponentFixture<LinkResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
