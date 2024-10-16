import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanciamientoEmpleoDetalleComponent } from './financiamiento-empleo-detalle.component';

describe('FinanciamientoEmpleoDetalleComponent', () => {
  let component: FinanciamientoEmpleoDetalleComponent;
  let fixture: ComponentFixture<FinanciamientoEmpleoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanciamientoEmpleoDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanciamientoEmpleoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
