import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroSedeComponent } from './registro-sede.component';

describe('RegistroSedeComponent', () => {
  let component: RegistroSedeComponent;
  let fixture: ComponentFixture<RegistroSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroSedeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
