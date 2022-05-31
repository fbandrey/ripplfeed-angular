// --- Modules ---
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdCardModule,
  MdToolbarModule,
  MdMenuModule,
  MdIconModule,
  MdInputModule,
  MdSnackBarModule,
  MdDialogModule,
  MdGridListModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule, JsonpModule, Response } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import 'hammerjs';

// --- Components ---
import { AppComponent } from './client/components/app.component';
import { AdminComponent } from './admin/components/admin.component';
import { NavbarComponent, LogoutDialogComponent } from './client/components/navbar/navbar.component';
import { ItemDestroyDialogComponent } from './client/components/dialogs/item_destroy_dialog.component';

// --- Routes ---
import { AppRoutingModule, AppRoutingComponents } from './client/app-routing.module';
import { AdminModule } from './admin.module';

// --- Services ---
import { Helpers } from './services/helpers';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { AuthRequest } from './services/auth-request';
import { Session } from './services/session';

// --- Extensions ---
import './extensions/string'

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    NavbarComponent, LogoutDialogComponent,
    ItemDestroyDialogComponent,
    AppRoutingComponents
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCardModule,
    MdToolbarModule,
    MdMenuModule,
    MdIconModule,
    MdInputModule,
    MdSnackBarModule,
    MdDialogModule,
    MdGridListModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    AdminModule,
    FlexLayoutModule
  ],
  // https://angular.io/guide/security
  // https://stackoverflow.com/questions/39016862/how-to-add-csrf-token-to-angular-2-application
  providers: [
    Helpers,
    AuthGuard,
    AuthService,
    AuthRequest,
    Session,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LogoutDialogComponent,
    ItemDestroyDialogComponent
  ]
})
export class AppModule { }
