import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroFormComponent } from './livro-form.component';

describe('LivroFormComponent', () => {
  let component: LivroFormComponent;
  let fixture: ComponentFixture<LivroFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivroFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
