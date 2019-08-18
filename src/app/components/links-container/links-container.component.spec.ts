import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksContainerComponent } from './links-container.component';

describe('LinksContainerComponent', () => {
  let component: LinksContainerComponent;
  let fixture: ComponentFixture<LinksContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinksContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
