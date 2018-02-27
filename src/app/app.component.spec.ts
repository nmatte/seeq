import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AudioContextService } from './audio/audio-context.service';
import { HeaderComponent } from './header/header.component';
import { ToneMatrixViewComponent } from './matrix/tone-matrix-view/tone-matrix-view.component';
import { NgReduxModule } from '@angular-redux/store';
import { ToneMatrixActions } from './matrix/actions';
import { MatrixLoopService } from './matrix/matrix-loop.service';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgReduxModule],
      providers: [AudioContextService, ToneMatrixActions, MatrixLoopService],
      declarations: [
        AppComponent,
        HeaderComponent,
        ToneMatrixViewComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));
});
