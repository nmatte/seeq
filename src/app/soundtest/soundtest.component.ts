import { Component, OnInit } from '@angular/core';
import { Note } from './note';
import { NoteHz } from './noteHz';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-soundtest',
  templateUrl: './soundtest.component.html',
  styleUrls: ['./soundtest.component.css']
})
export class SoundtestComponent implements OnInit {

  gain: GainNode;
  audioCtx: AudioContext;
  notes: string[] = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4']

  cols = [1, 2, 3, 4];
  matrix: {[beat: number]: { [note: string]: boolean} } = {};
  private absoluteBeat: number = 1;
  beat: number = 1;

  constructor() { }

  matrixToggle(note: string, beat: number) {
    this.matrix[beat - 1][note] = !this.matrix[beat - 1][note];
  }

  isEnabled(note: string, beat: number) {
    return this.matrix[beat - 1] && this.matrix[beat - 1][note];
  }

  initMatrix() {
    Observable
    .from(this.cols)
    .subscribe((col: number) => {
      this.matrix[col - 1] = {};
    })
  }

  getNotesForBeat(beat: number) {
    let notes = this.matrix[beat - 1];
    if (!notes) {
      notes = this.matrix[beat - 1] = {};
    }
  }

  ngOnInit() {
    this.initMatrix();
    // create web audio api context
    if (window.AudioContext) {
      console.info("found AudioContext");
      this.audioCtx = new AudioContext();
    } else if (webkitAudioContext) {
      console.info("not found AudioContext");
      this.audioCtx = new webkitAudioContext();
    }

    Observable
      .interval(500)
      .do((beat) => {
        this.absoluteBeat = beat + 1;
        this.beat = this.absoluteBeat % 4 + 1;
      })
      .do((beat) => {
        this.notes.forEach(note => {
          if (this.isEnabled(note, this.beat)) {
            this.playNote(note);
          }
        })
      })
      .subscribe();
  }

  getNote(note: string) {
    return NoteHz[note];
  }

  playNote(note: string) {
    new Note(this.getNote(note), 'sine', 0.5)
      .play(this.audioCtx);
  }

}
