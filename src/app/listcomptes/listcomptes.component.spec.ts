import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcomptesComponent } from './listcomptes.component';

describe('ListcomptesComponent', () => {
  let component: ListcomptesComponent;
  let fixture: ComponentFixture<ListcomptesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListcomptesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListcomptesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
