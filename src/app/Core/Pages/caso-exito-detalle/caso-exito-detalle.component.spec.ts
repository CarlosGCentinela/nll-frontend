import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasoExitoDetalleComponent } from './caso-exito-detalle.component';

describe('CasoExitoDetalleComponent', () => {
  let component: CasoExitoDetalleComponent;
  let fixture: ComponentFixture<CasoExitoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasoExitoDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasoExitoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
