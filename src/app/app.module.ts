import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { TilesContainerComponent } from './components/tiles-container/tiles-container.component';
import { TilesTabComponent } from './components/tiles-container/tiles-tab/tiles-tab.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { LogoComponent } from './components/menu-bar/logo/logo.component';
import { LoginComponent } from './components/menu-bar/login/login.component';
import { SpinnerComponent } from './components/ui/spinner/spinner.component';
import { AlertComponent } from './components/ui/alert/alert.component';
import { NotesComponent } from './components/notes/notes.component';
import { NoteComponent } from './components/notes/note/note.component';

@NgModule({
  declarations: [
    AppComponent,
    TilesContainerComponent,
    TilesTabComponent,
    MenuBarComponent,
    LogoComponent,
    LoginComponent,
    SpinnerComponent,
    AlertComponent,
    NotesComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'firebaseApp'),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
