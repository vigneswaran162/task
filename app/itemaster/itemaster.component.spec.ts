import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemasterComponent } from './itemaster.component';

describe('ItemasterComponent', () => {
  let component: ItemasterComponent;
  let fixture: ComponentFixture<ItemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
