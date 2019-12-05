import { TestBed } from '@angular/core/testing';

import { AdiantamentosService } from './adiantamentos.service';

describe('AdiantamentosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdiantamentosService = TestBed.get(AdiantamentosService);
    expect(service).toBeTruthy();
  });
});
