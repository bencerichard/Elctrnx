import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Address} from '../models/Address';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  addressForm: FormGroup;

  // countries: any[] = [
  //   {value: 'Romania', viewValue: 'Romania'},
  //   {value: 'Anglia', viewValue: 'Anglia'},
  //   {value: 'Germania', viewValue: 'Germania'},
  // ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { Address, surname: string },
    private dialogRef: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
        country: ['', Validators.required],
        city: ['', Validators.required],
        street: ['', Validators.required],
        number: ['', Validators.required],
        surname: ['', Validators.required]
      }
    );
  }

  mapInputToAddress(): { address: Address, surname: string } {
    return {
      address: {
        country: this.addressData.country.value,
        city: this.addressData.city.value,
        street: this.addressData.street.value,
        number: this.addressData.number.value,
      }, surname: this.addressData.surname.value
    };
  }

  get addressData() {
    return this.addressForm.controls;
  }

  cancel() {
    this.dialogRef.close({data: ''});
  }

  confirm() {
    let data = this.mapInputToAddress();
    this.dialogRef.close({data: data});
  }
}
