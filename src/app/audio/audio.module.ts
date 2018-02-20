import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayBeat } from './play-beat.middleware';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [PlayBeat]
})
export class AudioModule { }
