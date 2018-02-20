import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAppState } from './model';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { rootReducer } from './reducers';
import { AudioModule } from '../audio/audio.module';
import { PlayBeat } from '../audio/play-beat.middleware';

@NgModule({
  imports: [
    CommonModule,
    NgReduxModule,
    AudioModule
  ],
  declarations: []
})
export class StoreModule {
  constructor(ngRedux: NgRedux<IAppState>, playBeat: PlayBeat) {
    // Tell @angular-redux/store about our rootReducer and our initial state.
    // It will use this to create a redux store for us and wire up all the
    // events.
    ngRedux.configureStore(
      rootReducer,
      {},
      [playBeat.middleware]
    );
  }
 }
