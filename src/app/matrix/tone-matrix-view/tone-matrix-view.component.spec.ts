import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToneMatrixViewComponent } from './tone-matrix-view.component';

describe('SoundtestComponent', () => {
  let component: ToneMatrixViewComponent;
  let fixture: ComponentFixture<ToneMatrixViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToneMatrixViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToneMatrixViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
