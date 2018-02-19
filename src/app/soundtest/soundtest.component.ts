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

  toneMatrix: ToneMatrix = new ToneMatrix();
  
  private absoluteBeat: number = 1;
  beat: number = 1;

  constructor() { }

  matrixToggle(note: string, beat: number) {
    this.toneMatrix.matrixToggle(note, beat);
  }

  isEnabled(note: string, beat: number) {
    return this.toneMatrix.isEnabled(note, beat);
  }

  getNotesForBeat(beat: number) {
    return this.toneMatrix.getNotesForBeat(beat);
  }

  ngOnInit() {
    
    // create web audio api context
    this.audioCtx = AudioContextService.getAudioContext();

    Observable
      .interval(500)
      .do((beat) => {
        this.absoluteBeat = beat + 1;
        this.beat = this.absoluteBeat % 4 + 1;
      })
      .do((beat) => {
        this.toneMatrix.notes.forEach(note => {
          if (this.isEnabled(note, this.beat)) {
            this.playNote(note);
          }
        })
      })
      .subscribe();
  }

  playNote(note: string) {
    new Note(NoteHz[note], 'sine', 0.5)
      .play(this.audioCtx);
  }

}
