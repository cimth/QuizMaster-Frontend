import {TestBed} from '@angular/core/testing';

import {ResponseDecoderService} from './response-decoder.service';

describe('ResponseDecoderService', () => {
  let service: ResponseDecoderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseDecoderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
