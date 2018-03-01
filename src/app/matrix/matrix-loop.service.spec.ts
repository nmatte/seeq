import { TestBed, inject } from '@angular/core/testing';

import { MatrixLoopService } from './matrix-loop.service';

describe('MatrixLoopService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatrixLoopService]
    });
  });

  it('should be created', inject([MatrixLoopService], (service: MatrixLoopService) => {
    expect(service).toBeTruthy();
  }));
});
