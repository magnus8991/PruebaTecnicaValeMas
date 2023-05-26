import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionManipuladorComponent } from './gestion-manipulador.component';

describe('GestionManipuladorComponent', () => {
  let component: GestionManipuladorComponent;
  let fixture: ComponentFixture<GestionManipuladorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionManipuladorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionManipuladorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
