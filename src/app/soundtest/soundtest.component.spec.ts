import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundtestComponent } from './soundtest.component';

describe('SoundtestComponent', () => {
  let component: SoundtestComponent;
  let fixture: ComponentFixture<SoundtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoundtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
