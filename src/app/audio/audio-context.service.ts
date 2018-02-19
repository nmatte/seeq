import { Injectable } from '@angular/core';

let audioContext: AudioContext;

@Injectable()
export class AudioContextService {

  private audioContext: AudioContext;

  constructor() { }

  public getAudioContext(): AudioContext {
    if (this.audioContext) {
      return this.audioContext;
    }
    if (!!AudioContext) {
      this.audioContext = new AudioContext();
    } else if (!!webkitAudioContext) {
      this.audioContext = new webkitAudioContext();
    }
    return this.audioContext;
  }

}
