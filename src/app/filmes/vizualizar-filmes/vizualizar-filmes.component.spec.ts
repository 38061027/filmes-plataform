import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizarFilmesComponent } from './vizualizar-filmes.component';

describe('VizualizarFilmesComponent', () => {
  let component: VizualizarFilmesComponent;
  let fixture: ComponentFixture<VizualizarFilmesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VizualizarFilmesComponent]
    });
    fixture = TestBed.createComponent(VizualizarFilmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
