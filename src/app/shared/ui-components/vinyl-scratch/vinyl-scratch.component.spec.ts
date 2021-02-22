/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VinylScratchComponent } from './vinyl-scratch.component';

describe('VinylScratchComponent', () => {
  let component: VinylScratchComponent;
  let fixture: ComponentFixture<VinylScratchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VinylScratchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VinylScratchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
