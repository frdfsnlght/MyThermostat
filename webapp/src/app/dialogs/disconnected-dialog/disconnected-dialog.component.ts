import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-disconnected-dialog',
  templateUrl: './disconnected-dialog.component.html',
  styleUrls: ['./disconnected-dialog.component.css']
})
export class DisconnectedDialog {

  constructor(private dialogRef: MatDialogRef<DisconnectedDialog>) {
    this.dialogRef.disableClose = true;
  }

}
