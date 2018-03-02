import { Component, OnInit } from '@angular/core';
import { NoteHz } from '../../audio/noteHz';
import { Observable } from 'rxjs/Rx';
import { AudioContextService } from '../../audio/audio-context.service';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../store/model';
import { ToneMatrixActions } from '../actions';
import { IToneMatrixState } from '../reducer';
import { Beat } from '../tone-matrix';
import { MatrixLoopService } from '../matrix-loop.service';

@Component({
  selector: 'app-tone-matrix-view',
  templateUrl: './tone-matrix-view.component.html',
  styleUrls: ['./tone-matrix-view.component.css']
})
export class ToneMatrixViewComponent implements OnInit {

  gain: GainNode;
  audioCtx: AudioContext;

  @select(['toneMatrix', 'matrix', 'notes']) readonly notes$: Observable<Beat[]>;
  @select(['toneMatrix', 'time']) readonly lastBeatTime$: Observable<number>;
  @select(['toneMatrix', 'availableNotes']) readonly availableNotes$: Observable<string[]>;
  @select(['toneMatrix', 'beat']) readonly activeBeat$: Observable<number>;
  activeBeat: number;
  availableNotes: string[];
  lastRecordedBeat: number;

  constructor(private audioContextService: AudioContextService, 
              private ngRedux: NgRedux<IAppState>,
              private actions: ToneMatrixActions,
              private matrixLoop: MatrixLoopService) { }

  ngOnInit() {
    this.ngRedux.dispatch(this.actions.initMatrix(
      ['A4', 'G4', 'E4', 'D4', 'C4', 'A3', 'G3', 'E3', 'D3', 'C3', 'A2'], 
      8
    ))

    this.availableNotes$.subscribe(available => {
      this.availableNotes = available
    });

    this.activeBeat$.subscribe(beat => this.activeBeat = beat)
    this.lastBeatTime$.subscribe(time => this.lastRecordedBeat = time);
  }

  matrixToggle(note: string, index: number): void {
    this.ngRedux.dispatch(this.actions.toggleNote(note, index + 1));
    if (!this.matrixLoop.isActive()) {
      this.ngRedux.dispatch(this.actions.recordBeat());
      this.matrixLoop.start();
    }
  }

}
