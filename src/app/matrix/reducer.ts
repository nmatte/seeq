import { Action } from 'redux';
import { ToneMatrixActions, ToneMatrixAction } from './actions';
import { ToneMatrixRdx, Beat } from './tone-matrix-rdx';
import { Observable } from 'rxjs/Rx';

export interface IMatrixState {
    matrix: ToneMatrixRdx,
    beat: number
}

export const INITIAL_STATE: IMatrixState = {
    matrix: {notes: [{}]},
    beat: 1
};

function toggleNoteForBeat (beat: Beat, note: string): Beat {
    let newBeat: Beat = {...beat};
    newBeat[note] = !beat[note];
    return newBeat;
}


export function matrixReducer(lastState: IMatrixState = INITIAL_STATE, action: ToneMatrixAction): IMatrixState {
    switch (action.type) {
        case ToneMatrixActions.TOGGLE_NOTE:  
            return { 
                ...lastState,
                matrix: {
                    notes: lastState.matrix.notes.map((beat: Beat, index: number) => {
                        if (action.payload.beat === index + 1) {
                            return toggleNoteForBeat(beat, action.payload.note)
                        }
                        return {...beat};
                    })
                }
            };
        case ToneMatrixActions.INIT_MATRIX:
            let newState = {
                ...lastState,
                matrix: {notes: []}
            };
            for (let i = 0; i < action.payload.numBeats; i++) {
                newState.matrix.notes.push({});
            }
            return newState;
        case ToneMatrixActions.PLAY_BEAT:
            if (lastState.beat >= 8) {
                return {
                    ...lastState,
                    beat: 1
                }
            } 
            return {
                ...lastState,
                beat: lastState.beat + 1
            }
    }

  return lastState;
}