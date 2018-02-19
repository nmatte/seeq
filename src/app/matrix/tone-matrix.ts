import { Observable } from "rxjs/Observable";

export class ToneMatrix {
    notes: string[] = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4']
    cols = [1, 2, 3, 4];
    matrix: {[beat: number]: { [note: string]: boolean} } = {};

    constructor () {
        Observable
            .from(this.cols)
            .subscribe((col: number) => {
            this.matrix[col - 1] = {};
            })
    }

    matrixToggle(note: string, beat: number) {
        this.matrix[beat - 1][note] = !this.matrix[beat - 1][note];
    }

    isEnabled(note: string, beat: number) {
        return this.matrix[beat - 1] && this.matrix[beat - 1][note];
    }

    getNotesForBeat(beat: number) {
        let notes = this.matrix[beat - 1];
        if (!notes) {
            notes = this.matrix[beat - 1] = {};
        }
    }
}
