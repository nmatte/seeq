import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioContextService } from './audio-context.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AudioContextService]
})
export class AudioModule { }
