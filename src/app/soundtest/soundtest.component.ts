import { Component, OnInit } from '@angular/core';
import { Note } from '../audio/note';
import { NoteHz } from './noteHz';
import { Observable } from 'rxjs/Rx';
import { AudioContextService } from '../audio/audio-context.service';
import { ToneMatrix } from '../matrix/tone-matrix';

@Component({
  selector: 'app-soundtest',
  templateUrl: './soundtest.component.html',
  styleUrls: ['./soundtest.component.css']
})
export class SoundtestComponent implements OnInit {

  gain: GainNode;
  audioCtx: AudioContext;

  toneMatrix: ToneMatrix;
  
  private absoluteBeat: number = 1;
  beat: number = 1;

  constructor(private audioContextService: AudioContextService) { }

  matrixToggle(note: string, beat: number) {
    this.toneMatrix.toggle(note, beat);
  }

  isEnabled(note: string, beat: number) {
    return this.toneMatrix.isEnabled(note, beat);
  }

  getNotesForBeat(beat: number) {
    return this.toneMatrix.getNotesForBeat(beat);
  }

  ngOnInit() {
    // create web audio api context
    this.toneMatrix = new ToneMatrix(
      ['A4', 'G4', 'E4', 'D4', 'C4', 'A3', 'G3', 'E3', 'D3', 'C3', 'A2'], 
      [1, 2, 3, 4, 5, 6, 7, 8]
    );
    this.audioCtx = this.audioContextService.getAudioContext();

    Observable
      .interval(500)
      .do((beat) => {
        this.absoluteBeat = beat + 1;
        this.beat = this.absoluteBeat % this.toneMatrix.cols.length + 1;
      })
      .do((beat) => {
        this.toneMatrix.getActiveNotes(this.beat).forEach(note => {
          this.playNote(note);
        })
      })
      .subscribe();
  }

  playNote(note: string) {
    new Note(NoteHz[note], 'sine', 0.5)
      .play(this.audioCtx);
  }

}
