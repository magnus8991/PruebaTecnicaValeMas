import { TestBed } from '@angular/core/testing';

import { ServicioSede } from './sede.service';

describe('ServicioSede', () => {
  let service: ServicioSede;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioSede);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
