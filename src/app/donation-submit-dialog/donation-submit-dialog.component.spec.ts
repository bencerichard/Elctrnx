import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationSubmitDialogComponent } from './donation-submit-dialog.component';

describe('DonationSubmitDialogComponent', () => {
  let component: DonationSubmitDialogComponent;
  let fixture: ComponentFixture<DonationSubmitDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationSubmitDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationSubmitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
