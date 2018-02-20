import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { AppComponent } from './app.component';
import { SoundtestComponent } from './soundtest/soundtest.component';
import { AudioContextService } from './audio/audio-context.service';
import { BeatService } from './audio/beat.service';
import { MatrixModule } from './matrix/matrix.module';
import { StoreModule } from './store/store.module';


@NgModule({
  declarations: [
    AppComponent,
    SoundtestComponent,
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    MatrixModule,
    StoreModule
  ],
  providers: [AudioContextService, BeatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
