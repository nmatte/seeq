import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToneMatrixActions } from './actions';
import { MatrixLoopService } from './matrix-loop.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ToneMatrixActions, MatrixLoopService]
})
export class MatrixModule { }
