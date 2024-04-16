import { TestBed } from '@angular/core/testing';

import { AiCarDealershipService } from './ai-car-dealership.service';

describe('LocalStorageService', () => {
  let service: AiCarDealershipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiCarDealershipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
