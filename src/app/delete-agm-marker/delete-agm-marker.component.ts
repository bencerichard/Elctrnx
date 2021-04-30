import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-agm-marker',
  templateUrl: './delete-agm-marker.component.html',
  styleUrls: ['./delete-agm-marker.component.css']
})
export class DeleteAgmMarkerComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
    private dialogRef: MatDialogRef<DeleteAgmMarkerComponent>,
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
