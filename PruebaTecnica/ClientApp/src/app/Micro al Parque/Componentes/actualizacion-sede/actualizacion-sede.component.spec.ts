import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActualizacionSedeComponent } from './actualizacion-sede.component';

describe('ActualizacionSedeComponent', () => {
  let component: ActualizacionSedeComponent;
  let fixture: ComponentFixture<ActualizacionSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizacionSedeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizacionSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
