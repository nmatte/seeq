import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAppState } from './model';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { rootReducer } from './reducers';
import { AudioModule } from '../audio/audio.module';

@NgModule({
  imports: [
    CommonModule,
    NgReduxModule,
    AudioModule
  ],
  declarations: []
})
export class StoreModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(
      rootReducer,
      {},
    );
  }
 }
