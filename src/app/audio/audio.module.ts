import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioContextService } from './audio-context.service';
import { NoteService } from './noteService';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AudioContextService, NoteService]
})
export class AudioModule { }
