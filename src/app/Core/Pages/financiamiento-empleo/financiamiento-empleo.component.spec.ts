import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanciamientoEmpleoComponent } from './financiamiento-empleo.component';

describe('FinanciamientoEmpleoComponent', () => {
  let component: FinanciamientoEmpleoComponent;
  let fixture: ComponentFixture<FinanciamientoEmpleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanciamientoEmpleoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanciamientoEmpleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
