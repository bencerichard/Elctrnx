import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteAgmMarkerComponent} from './delete-agm-marker.component';

describe('DeleteAgmMarkerComponent', () => {
  let component: DeleteAgmMarkerComponent;
  let fixture: ComponentFixture<DeleteAgmMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAgmMarkerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAgmMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
