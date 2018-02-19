export class Note {

    waveType: OscillatorType;
    noteHz: number;
    duration: number;
    gain: GainNode;

    private oscillator: OscillatorNode;

    constructor (noteHz: number = 440, waveType: OscillatorType = 'sine', duration: number = 0) {
        this.waveType = waveType;
        this.noteHz = noteHz;
        this.duration = duration;
    }

    play (audioCtx: AudioContext) {
        // create Oscillator node
        this.gain = audioCtx.createGain();
        this.gain.gain.value = 0.2;
        this.gain.connect(audioCtx.destination);

        this.oscillator = audioCtx.createOscillator();
        this.oscillator.type = this.waveType;
        this.oscillator.frequency.setValueAtTime(this.noteHz, audioCtx.currentTime); // value in hertz
        this.oscillator.connect(this.gain);
        this.oscillator.start();

        this.gain.gain.setTargetAtTime(0, audioCtx.currentTime + this.duration, 0.015);
    }

    stop () {
        if (!this.oscillator) {
            return;
        }
        this.oscillator.stop();
        this.oscillator = undefined;
    }
}