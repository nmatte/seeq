import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class BeatService {

  private absoluteBeat: number = 1;
  beat: number = 1;

  constructor() { }

  getBeat(numBeats: number): Observable<number> {
    return Observable
      .interval(500)
      .do((beat) => {
        this.absoluteBeat = beat + 1;
      })
      .map((beat) => {
        return (this.absoluteBeat % numBeats) + 1;
      })
  }

}
