import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEncuestaChequeoComponent } from './reg-lista-chequeo.component';

describe('RegistroEncuestaChequeoComponent', () => {
  let component: RegistroEncuestaChequeoComponent;
  let fixture: ComponentFixture<RegistroEncuestaChequeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroEncuestaChequeoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEncuestaChequeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
