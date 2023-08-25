import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosmasterComponent } from './posmaster.component';

describe('PosmasterComponent', () => {
  let component: PosmasterComponent;
  let fixture: ComponentFixture<PosmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
