import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerChequeoComponent } from './ver-chequeo.component';

describe('VerChequeoComponent', () => {
  let component: VerChequeoComponent;
  let fixture: ComponentFixture<VerChequeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerChequeoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerChequeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
