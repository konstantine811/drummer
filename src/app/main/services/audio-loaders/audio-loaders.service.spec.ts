import { TestBed } from '@angular/core/testing';

import { AudioLoadersService } from './audio-loaders.service';

describe('AudioLoadersService', () => {
  let service: AudioLoadersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioLoadersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
