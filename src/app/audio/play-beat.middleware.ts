import { Injectable } from "@angular/core";
import { ToneMatrixActions } from "../matrix/actions";
import { AudioContextService } from "./audio-context.service";
import { Note } from "./note";
import { NoteHz } from "./noteHz";

@Injectable()
export class PlayBeat {
    constructor(private audioContextService: AudioContextService) {}

    middleware = store => next => action => {
        if (action.type === ToneMatrixActions.PLAY_BEAT) {
            let beat = store.getState().matrixReducer.beat;
            let notes = store.getState().matrixReducer.matrix.notes[beat - 1];
            console.info("Enter the matrix", store.getState().matrixReducer.matrix);
            console.info("This beat, these notes", beat, notes);
        
            if (notes) {
                console.info("I wanna play these!", Object.keys(notes).filter(note => !!notes[note]));
                Object.keys(notes).filter(note => !!notes[note]).forEach(note => {
                    new Note(NoteHz[note], 'sine', 0.5).play(this.audioContextService.getAudioContext());
                })
            }
            return next(action);
        } else {
            return next(action);
        }
    }
}