import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthRequest } from '../../../services/auth-request';
import { environment } from '../../../../environments/environment';
import { Helpers } from '../../../services/helpers';
import { MdSnackBar } from '@angular/material';
import * as _ from 'underscore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users = [];
  audio = new Audio();
  currentUser = null;
  timeout = 2000;

  constructor(
    private sanitizer: DomSanitizer,
    private request: AuthRequest,
    private helpers: Helpers,
    private snackBar: MdSnackBar
  ) {}

  ngOnInit() {
    this.request.get('/users')
                .subscribe(
                  data => this.users = data['data'],
                  error => console.log('Error: ', error)
                );

    this.audio.addEventListener('ended', () => {
      this.audio.pause();
      setTimeout(() => {
        this.playItem(this.currentUser);
      }, this.feedLength(this.currentUser) > 0 ? this.timeout : 0);
    });
  }

  // javascript:(function(){var%20s=document.createElement('script');s.charset='UTF-8';s.src='{{ env.host }}/assets/foo.js';document.body.appendChild(s)})();

  scriptString = () => {
    return this.sanitizer.bypassSecurityTrustUrl(`
      javascript:
        (function () {
          s = document.createElement('script');
          s.charset = 'UTF-8';
          s.src = '${ environment.frontEndHost }/assets/ripplHandler.js';
          document.body.appendChild(s)
        })();
    `.replace(/ /g, ''))
  }

  startPlaying = (user) => {
    if (this.currentUser) {
      this.stopPlaying(this.currentUser);
    }
    this.currentUser = user;
    this.playItem(user);
  }

  stopPlaying = (user) => {
    if (this.currentUser) {
      this.audio.pause();
      // this.audio.currentTime = 0;
      user.playing = false;
      this.currentUser = null;
    }
  }

  playItem = (user) => {
    const nextUrl = this.nextItem(user);
    if (nextUrl) {
      this.audio.src = nextUrl;
      this.audio.load();
      this.audio.play();
      user.playing = true;
    } else {
      this.stopPlaying(user);
      this.snackBar.open('No audio files for DJ ' + user.attributes['nick-name'] + ' anymore', 'Undo', { duration: 3000 });
    }
  }

  feedLength = (user) => {
    return user.attributes.feed.length;
  }

  nextItem = (user) => {
    if (this.feedLength(user) > 0) {
      const index = _.random(this.feedLength(user) - 1);
      const path = user.attributes.feed[index];
      user.attributes.feed = _.without(user.attributes.feed, path);
      return this.fullUrl(path);
    } else {
      return null;
    }
  }

  fullUrl = (path) => {
    return environment.backEndHost + '/' + path;
  }
}
