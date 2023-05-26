import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRestauranteComponent } from './gestion-restaurante.component';

describe('GestionRestauranteComponent', () => {
  let component: GestionRestauranteComponent;
  let fixture: ComponentFixture<GestionRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionRestauranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
