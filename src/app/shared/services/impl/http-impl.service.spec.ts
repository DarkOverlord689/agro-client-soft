import { TestBed } from '@angular/core/testing';

import { HttpImplService } from './http-impl.service';

describe('HttpImplService', () => {
  let service: HttpImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
