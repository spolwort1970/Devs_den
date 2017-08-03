/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmpLoginComponent } from './emp-login.component';

describe('EmpLoginComponent', () => {
  let component: EmpLoginComponent;
  let fixture: ComponentFixture<EmpLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
