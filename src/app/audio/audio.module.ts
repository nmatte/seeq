import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioContextService } from './audio-context.service';
import { MatrixLoopService } from './matrix-loop.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AudioContextService, MatrixLoopService]
})
export class AudioModule { }
