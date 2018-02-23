import { Component, OnInit } from '@angular/core';
import { Note } from '../audio/note';
import { NoteHz } from '../audio/noteHz';
import { Observable } from 'rxjs/Rx';
import { AudioContextService } from '../audio/audio-context.service';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store/model';
import { ToneMatrixActions } from '../matrix/actions';
import { IMatrixState } from '../matrix/reducer';
import { Beat } from '../matrix/tone-matrix-rdx';
import { MatrixLoopService } from '../audio/matrix-loop.service';

@Component({
  selector: 'app-soundtest',
  templateUrl: './soundtest.component.html',
  styleUrls: ['./soundtest.component.css']
})
export class SoundtestComponent implements OnInit {

  gain: GainNode;
  audioCtx: AudioContext;

  beatActive: boolean;
  @select(['matrixReducer', 'matrix', 'notes']) readonly notes$: Observable<Beat[]>;
  @select(['matrixReducer', 'time']) readonly lastBeatTime$: Observable<number>;
  @select(['matrixReducer', 'availableNotes']) readonly availableNotes$: Observable<string[]>;
  @select(['matrixReducer', 'beat']) readonly activeBeat$: Observable<number>;
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
    if (!this.beatActive) {
      this.beatActive = true;

      this.ngRedux.dispatch(this.actions.recordBeat());
      
      this.matrixLoop.start();

    }
  }

}
