import { TestBed } from '@angular/core/testing';

import { ListasTrabalhadoresService } from './listas-trabalhadores.service';

describe('ListasTrabalhadoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListasTrabalhadoresService = TestBed.get(ListasTrabalhadoresService);
    expect(service).toBeTruthy();
  });
});
