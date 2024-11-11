import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IataTableComponent } from './iata-table.component';

describe('IataTableComponent', () => {
  let component: IataTableComponent;
  let fixture: ComponentFixture<IataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IataTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
