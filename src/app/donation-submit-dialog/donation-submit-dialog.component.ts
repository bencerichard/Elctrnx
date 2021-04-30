import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Address} from '../models/Address';

@Component({
  selector: 'app-donation-submit-dialog',
  templateUrl: './donation-submit-dialog.component.html',
  styleUrls: ['./donation-submit-dialog.component.css']
})
export class DonationSubmitDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string, amount: number } ,
    private dialogRef: MatDialogRef<DonationSubmitDialogComponent>,
  ) {
  }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }

}
