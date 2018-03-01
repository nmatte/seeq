import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { FluxStandardAction } from 'flux-standard-action';
import { timeInterval } from 'rxjs/operators';

type Payload = { 
  note?: string, 
  beat?: number,
  notes?: string[],
  numBeats?: number,
  time?: number
};
interface MetaData { };
export type ToneMatrixAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class ToneMatrixActions {

  static TOGGLE_NOTE = 'TOGGLE_NOTE';
  static INIT_MATRIX = 'INIT_MATRIX';
  static PLAY_BEAT = 'PLAY_BEAT';
  static RECORD_BEAT = 'RECORD_BEAT';

  toggleNote(note: string, beat: number): ToneMatrixAction {
      return {
          type: ToneMatrixActions.TOGGLE_NOTE,
          payload: { note, beat },
          meta: {}
      }
  }

  initMatrix(notes: string[], numBeats): ToneMatrixAction {
      return {
        type: ToneMatrixActions.INIT_MATRIX,
        payload: { notes, numBeats },
        meta: {}
      }
  }

  incrementBeat(): ToneMatrixAction {
    return {
      type: ToneMatrixActions.PLAY_BEAT,
      payload: {},
      meta: {}
    }
  }

  recordBeat(): ToneMatrixAction {
    return {
      type: ToneMatrixActions.RECORD_BEAT,
      payload: {
        time: new Date().getTime()
      }, 
      meta: {}
    }
  }
}