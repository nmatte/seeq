import { Injectable } from "@angular/core";

export interface NoteParams {
    waveType: OscillatorType;
    noteHz: number;
    duration: number;
}

@Injectable()
export class NoteService {

    waveType: OscillatorType;
    noteHz: number;
    duration: number;
    gain: GainNode;

    private oscillator: OscillatorNode;

    play (audioCtx: AudioContext, note: NoteParams) {
        // create Oscillator node
        let gain = audioCtx.createGain();
        gain.gain.value = 0.2;
        gain.connect(audioCtx.destination);

        let oscillator = audioCtx.createOscillator();
        oscillator.type = note.waveType;
        oscillator.frequency.setValueAtTime(note.noteHz, audioCtx.currentTime); // value in hertz
        oscillator.connect(gain);
        oscillator.start();

        gain.gain.setTargetAtTime(0, audioCtx.currentTime + note.duration, 0.015);
    }
}