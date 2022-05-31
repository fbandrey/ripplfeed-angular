import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-item-destroy-dialog',
  template: `
    <h1 md-dialog-title>Are you sure you want to delete item?</h1>
    <div md-dialog-actions>
      <span class="spacer"></span>
      <button md-button (click)="dialogRef.close(false)">Cancel</button>
      <button md-button (click)="dialogRef.close(true)">Yes, delete it</button>
    </div>
  `,
  styles: [`
    .spacer { flex: 1 1 auto }
  `]
})
export class ItemDestroyDialogComponent {
  constructor(public dialogRef: MdDialogRef<ItemDestroyDialogComponent>) {}
}
