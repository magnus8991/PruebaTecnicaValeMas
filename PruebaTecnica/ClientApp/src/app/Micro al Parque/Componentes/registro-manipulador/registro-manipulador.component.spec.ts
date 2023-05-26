import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroManipuladorComponent } from './registro-manipulador.component';

describe('RegistroManipuladorComponent', () => {
  let component: RegistroManipuladorComponent;
  let fixture: ComponentFixture<RegistroManipuladorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroManipuladorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroManipuladorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
