import { TestBed } from '@angular/core/testing';

import { MobService } from './mob.service';

describe('MobService', () => {
  let service: MobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
