import { TestBed } from '@angular/core/testing';
import { Mensajes } from './mensajes';

describe('Mensajes', () => {
  let mensajes: Mensajes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    mensajes = TestBed.inject(Mensajes);
  });

  it('should be created', () => {
    expect(mensajes).toBeTruthy();
  });
});
