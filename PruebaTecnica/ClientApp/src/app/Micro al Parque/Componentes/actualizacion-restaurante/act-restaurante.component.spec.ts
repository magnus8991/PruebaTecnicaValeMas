import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActualizacionRestauranteComponent } from './act-restaurante.component';

describe('ActualizacionRestauranteComponent', () => {
  let component: ActualizacionRestauranteComponent;
  let fixture: ComponentFixture<ActualizacionRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizacionRestauranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizacionRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
