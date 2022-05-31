import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../../../services/session';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    public dialog: MdDialog,
    public session: Session,
    private router: Router
  ) {}

  logout() {
    const dialog = this.dialog.open(LogoutDialogComponent);
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.session.clean();
        this.router.navigate(['/']);
      }
    });
  }

}

@Component({
  selector: 'app-logout-dialog',
  template: `
    <h1 md-dialog-title>Are you sure you want to logout?</h1>
    <div md-dialog-actions>
      <span class="spacer"></span>
      <button md-button (click)="dialogRef.close(false)">Cancel</button>
      <button md-button (click)="dialogRef.close(true)">Yes, logout</button>
    </div>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto
    }
  `]
})
export class LogoutDialogComponent {
  constructor(public dialogRef: MdDialogRef<LogoutDialogComponent>) {}
}
