import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaRestauranteComponent } from './encuesta-restaurante.component';

describe('EncuestaRestauranteComponent', () => {
  let component: EncuestaRestauranteComponent;
  let fixture: ComponentFixture<EncuestaRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncuestaRestauranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestaRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
