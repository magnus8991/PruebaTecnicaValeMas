import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSedeComponent } from './gestion-sede.component';

describe('GestionSedeComponent', () => {
  let component: GestionSedeComponent;
  let fixture: ComponentFixture<GestionSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionSedeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
