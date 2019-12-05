import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasTrabalhadoresComponent } from './listas-trabalhadores.component';

describe('ListasTrabalhadoresComponent', () => {
  let component: ListasTrabalhadoresComponent;
  let fixture: ComponentFixture<ListasTrabalhadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListasTrabalhadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListasTrabalhadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
