import { Injectable } from '@angular/core';
import { AudioContextService } from '../audio/audio-context.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/model';
import { ToneMatrixActions } from '../matrix/actions';
import { NoteHz } from '../audio/noteHz';
import { NoteParams, NoteService } from '../audio/noteService';
import { Observable } from 'rxjs/Rx';
import { Beat } from '../matrix/tone-matrix';

@Injectable()
export class MatrixLoopService {

  lastRecordedBeat: number;
  beats: Beat[];
  activeBeat: number;
  private active: boolean;
  private intervalId: number;

  constructor(private audioContextService: AudioContextService,
              private noteService: NoteService,
              private ngRedux: NgRedux<IAppState>,
              private matrixActions: ToneMatrixActions) { }

  start() {
    this.active = true;
    this.ngRedux.select<number>(['toneMatrix', 'time'])
      .subscribe(lastRecordedBeat => this.lastRecordedBeat = lastRecordedBeat);
    this.ngRedux.select<Beat[]>(['toneMatrix', 'matrix', 'notes'])
      .subscribe(beats => this.beats = beats);
    this.ngRedux.select<number>(['toneMatrix', 'beat'])
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
                this.noteService.play(this.audioContextService.getAudioContext(), {
                  noteHz: NoteHz[note], 
                  waveType: 'sine',
                  duration: 0.5
                });
              })
              .subscribe();
        }
        
      }
    };
    
    this.intervalId = window.setInterval(doOnInterval, 5);
  }

  isActive(): boolean {
    return this.active;
  }

  stop() {
    window.clearInterval(this.intervalId);
    this.intervalId = undefined;
    this.active =  false;
  }

}
