import { Component, OnInit } from '@angular/core';
import { Note } from '../audio/note';
import { NoteHz } from '../audio/noteHz';
import { Observable } from 'rxjs/Rx';
import { AudioContextService } from '../audio/audio-context.service';
import { ToneMatrix } from '../matrix/tone-matrix';
import { BeatService } from '../audio/beat.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/model';
import { ToneMatrixActions } from '../matrix/actions';

@Component({
  selector: 'app-soundtest',
  templateUrl: './soundtest.component.html',
  styleUrls: ['./soundtest.component.css']
})
export class SoundtestComponent implements OnInit {

  gain: GainNode;
  audioCtx: AudioContext;

  toneMatrix: ToneMatrix;
  beat$: Observable<number>;
  beatActive: boolean;
  
  beat: number = 1;

  constructor(private audioContextService: AudioContextService, 
              private beatService: BeatService, 
              private ngRedux: NgRedux<IAppState>,
              private actions: ToneMatrixActions) { }

  ngOnInit() {
    this.toneMatrix = new ToneMatrix(
      ['A4', 'G4', 'E4', 'D4', 'C4', 'A3', 'G3', 'E3', 'D3', 'C3', 'A2'], 
      [1, 2, 3, 4, 5, 6, 7, 8]
    );
    this.ngRedux.dispatch(this.actions.initMatrix(
      ['A4', 'G4', 'E4', 'D4', 'C4', 'A3', 'G3', 'E3', 'D3', 'C3', 'A2'], 
      8
    ))
    this.audioCtx = this.audioContextService.getAudioContext();

    this.beat$ = this.beatService.getBeat(this.toneMatrix.cols.length)
      .do((beat) => {
        this.beat = beat;
        this.toneMatrix.getActiveNotes(beat).forEach(note => {
          // new Note(NoteHz[note], 'sine', 0.5).play(this.audioCtx);
        })

        this.ngRedux.dispatch(this.actions.playBeat());
      });
  }

  matrixToggle(note: string, beat: number) {
    this.toneMatrix.toggle(note, beat);
    this.ngRedux.dispatch(this.actions.toggleNote(note, beat));
    if (!this.beatActive) {
      this.beat$.subscribe();
      this.beatActive = true;
    }
  }

  isEnabled(note: string, beat: number) {
    return this.toneMatrix.isEnabled(note, beat);
  }

  getNotesForBeat(beat: number) {
    return this.toneMatrix.getNotesForBeat(beat);
  }

}
