import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MdSnackBar } from '@angular/material';
import { AuthRequest } from '../../../services/auth-request';
import { ItemDestroyDialogComponent } from '../dialogs/item_destroy_dialog.component';
import * as _ from 'underscore';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  items = [];
  textLimit = 420;

  constructor(
    public dialog: MdDialog,
    private snackBar: MdSnackBar,
    private request: AuthRequest
  ) {}

  ngOnInit() {
    this.request.get('/items')
                .subscribe(
                  data => this.items = data['data'],
                  error => console.log('Error: ', error)
                );
  }

  toggleVersion(item) {
    item.is_full_version = !item.is_full_version;
  }

  destroy(item) {
    const dialog = this.dialog.open(ItemDestroyDialogComponent);
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.request.delete('/items/' + item.id)
                    .subscribe(
                      data => {
                        this.items = _.without(this.items, item);
                        this.snackBar.open('Item was successfully removed', null, { duration: 3000 });
                      },
                      error => console.log('Error: ', error)
                    );
      }
    });
  }

}
