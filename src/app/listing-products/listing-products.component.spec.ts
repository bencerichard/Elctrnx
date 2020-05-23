import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingProductsComponent } from './listing-products.component';

describe('ListingProductsComponent', () => {
  let component: ListingProductsComponent;
  let fixture: ComponentFixture<ListingProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
