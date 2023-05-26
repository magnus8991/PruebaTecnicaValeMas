import { TestBed } from '@angular/core/testing';

import { ServicioPregunta } from './pregunta.service';

describe('ServicioPregunta', () => {
  let service: ServicioPregunta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioPregunta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
