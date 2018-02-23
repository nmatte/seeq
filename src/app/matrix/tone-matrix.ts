export interface ToneMatrix {
    notes: Beat[]
}

export type Beat = { [note: string]: boolean};