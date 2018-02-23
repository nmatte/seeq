import { Action } from 'redux';
import { ToneMatrixActions, ToneMatrixAction } from './actions';
import { ToneMatrixRdx, Beat } from './tone-matrix-rdx';
import { Observable } from 'rxjs/Rx';

export interface IMatrixState {
    matrix: ToneMatrixRdx,
    beat: number,
    numBeats: number,
    availableNotes: string[],
    time: number
}

export const INITIAL_STATE: IMatrixState = {
    matrix: {notes: [{}]},
    beat: 1,
    numBeats: 2,
    availableNotes: ['A4'],
    time: 0
};

export function matrixReducer(lastState: IMatrixState = INITIAL_STATE, action: ToneMatrixAction): IMatrixState {
    switch (action.type) {
        case ToneMatrixActions.TOGGLE_NOTE:  
            return { 
                ...lastState,
                matrix: {
                    notes: lastState.matrix.notes.map((beat: Beat, index: number) => {
                        if (action.payload.beat === index + 1) {
                            let newBeat: Beat = {...beat};
                            newBeat[action.payload.note] = !beat[action.payload.note];
                            return newBeat;
                        }
                        return {...beat};
                    })
                }
            };
        case ToneMatrixActions.INIT_MATRIX:
            let newState = {
                ...lastState,
                availableNotes: action.payload.notes,
                numBeats: action.payload.numBeats,
                matrix: {notes: []}
            };
            for (let i = 0; i < action.payload.numBeats; i++) {
                let newBeat: Beat = {};
                action.payload.notes.forEach(note => {
                    newBeat[note] = false;
                })
                newState.matrix.notes.push(newBeat);
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
        case ToneMatrixActions.RECORD_BEAT:
            return {
                ...lastState,
                time: action.payload.time
            }
    }

  return lastState;
}