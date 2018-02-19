import { Injectable } from '@angular/core';

let audioContext: AudioContext;

@Injectable()
export class AudioContextService {

  constructor() { }

  public static getAudioContext(): AudioContext {
    if (audioContext) {
      return audioContext;
    }
    if (!!AudioContext) {
      audioContext = new AudioContext();
    } else if (!!webkitAudioContext) {
      audioContext = new webkitAudioContext();
    }
    return audioContext;
  }

}
