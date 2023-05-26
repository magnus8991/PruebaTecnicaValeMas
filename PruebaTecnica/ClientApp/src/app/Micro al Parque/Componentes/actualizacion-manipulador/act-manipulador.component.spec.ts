import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionManipuladorComponent } from './act-manipulador.component';

describe('ActualizacionManipuladorComponent', () => {
  let component: ActualizacionManipuladorComponent;
  let fixture: ComponentFixture<ActualizacionManipuladorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizacionManipuladorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizacionManipuladorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
