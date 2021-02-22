import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DramControllerComponent } from './dram-controller.component';

describe('DramControllerComponent', () => {
  let component: DramControllerComponent;
  let fixture: ComponentFixture<DramControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DramControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DramControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
