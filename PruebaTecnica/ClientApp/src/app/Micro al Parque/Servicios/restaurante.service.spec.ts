import { TestBed } from '@angular/core/testing';

import { ServicioRestaurante } from './restaurante.service';

describe('RestauranteService', () => {
  let service: ServicioRestaurante;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioRestaurante);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
