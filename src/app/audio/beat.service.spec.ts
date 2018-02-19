import { TestBed, inject } from '@angular/core/testing';

import { BeatService } from './beat.service';

describe('BeatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeatService]
    });
  });

  it('should be created', inject([BeatService], (service: BeatService) => {
    expect(service).toBeTruthy();
  }));
});
