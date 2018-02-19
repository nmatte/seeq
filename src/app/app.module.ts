import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SoundtestComponent } from './soundtest/soundtest.component';
import { AudioContextService } from './audio/audio-context.service';
import { BeatService } from './audio/beat.service';


@NgModule({
  declarations: [
    AppComponent,
    SoundtestComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [AudioContextService, BeatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
