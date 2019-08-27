import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KoreanComponent } from './korean.component';

describe('KoreanComponent', () => {
  let component: KoreanComponent;
  let fixture: ComponentFixture<KoreanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoreanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoreanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
