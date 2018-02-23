import { Injectable } from '@angular/core';
import { AudioContextService } from './audio-context.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/model';
import { ToneMatrixActions } from '../matrix/actions';
import { NoteHz } from './noteHz';
import { Note } from './note';
import { Observable } from 'rxjs/Rx';
import { Beat } from '../matrix/tone-matrix-rdx';

@Injectable()
export class MatrixLoopService {

  lastRecordedBeat: number;
  beats: Beat[];
  activeBeat: number;

  constructor(private audioContextService: AudioContextService,
              private ngRedux: NgRedux<IAppState>,
              private matrixActions: ToneMatrixActions) { }

  start() {
    this.ngRedux.select<number>(['matrixReducer', 'time'])
      .subscribe(lastRecordedBeat => this.lastRecordedBeat = lastRecordedBeat);
    this.ngRedux.select<Beat[]>(['matrixReducer', 'matrix', 'notes'])
      .subscribe(beats => this.beats = beats);
    this.ngRedux.select<number>(['matrixReducer', 'beat'])
      .subscribe(activeBeat => this.activeBeat = activeBeat);

    this.ngRedux.dispatch(this.matrixActions.recordBeat());

    let doOnInterval = () => {
      let correctTime: boolean = (new Date().getTime() - this.lastRecordedBeat) > 500;
      if (correctTime) {
        this.ngRedux.dispatch(this.matrixActions.incrementBeat());
        this.ngRedux.dispatch(this.matrixActions.recordBeat());
        let notes = this.beats[this.activeBeat - 1];

        if (notes) {
            Observable.from(Object.keys(notes))
              .filter(note => !!notes[note])
              .do(note => {
                new Note(NoteHz[note], 'sine', 0.5).play(this.audioContextService.getAudioContext());
              })
              .subscribe();
        }
        
      }
    };
    
    setInterval(doOnInterval, 5);
  }

  stop() {

  }

}
