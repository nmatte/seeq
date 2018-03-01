import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToneMatrixActions } from './actions';
import { MatrixLoopService } from './matrix-loop.service';
import { ToneMatrixViewComponent } from './tone-matrix-view/tone-matrix-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ToneMatrixViewComponent],
  exports: [ToneMatrixViewComponent],
  providers: [ToneMatrixActions, MatrixLoopService]
})
export class MatrixModule { }
