import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AlertComponent } from './components/ui/alert/alert.component';
import { SpinnerComponent } from './components/ui/spinner/spinner.component';
import { FloatingCircleButtonComponent } from './components/ui/floating-circle-button/floating-circle-button.component';
import { TilesContainerComponent } from './components/tiles-container/tiles-container.component';
import { TilesTabComponent } from './components/tiles-container/tiles-tab/tiles-tab.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { LogoComponent } from './components/menu-bar/logo/logo.component';
import { LoginComponent } from './components/menu-bar/login/login.component';
import { NotesComponent } from './components/notes/notes.component';
import { NoteComponent } from './components/notes/note/note.component';
import { AddNoteComponent } from './components/notes/add-note/add-note.component';
import { LinksContainerComponent } from './components/links-container/links-container.component';
import { AddLinkComponent } from './components/links-container/add-link/add-link.component';
import { SearchLinkComponent } from './components/links-container/search-link/search-link.component';
import { LinkResultsComponent } from './components/links-container/link-results/link-results.component';
import { LinkItemComponent } from './components/links-container/link-results/link-item/link-item.component';
import { AddTileComponent } from './components/tiles-container/add-tile/add-tile.component';
import { WeatherComponent } from './components/weather/weather.component';
import { ContentBoxComponent } from './components/content-box/content-box.component';
import { CurrentWeatherComponent } from './components/weather/current-weather/current-weather.component';
import { DailyWeatherComponent } from './components/weather/daily-weather/daily-weather.component';
import { DevToComponent } from './components/dev-to/dev-to.component';
import { DevToPostComponent } from './components/dev-to/dev-to-post/dev-to-post.component';
import { KoreanComponent } from './components/korean/korean.component';
import { DictComponent } from './components/korean/dict/dict.component';
import { NavComponent } from './components/menu-bar/nav/nav.component';
import { DevToSearchComponent } from './components/dev-to/dev-to-search/dev-to-search.component';
import { BirthdaysComponent } from './components/birthdays/birthdays.component';

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
    NoteComponent,
    FloatingCircleButtonComponent,
    AddNoteComponent,
    LinksContainerComponent,
    AddLinkComponent,
    SearchLinkComponent,
    LinkResultsComponent,
    LinkItemComponent,
    AddTileComponent,
    WeatherComponent,
    ContentBoxComponent,
    CurrentWeatherComponent,
    DailyWeatherComponent,
    DevToComponent,
    DevToPostComponent,
    KoreanComponent,
    DictComponent,
    NavComponent,
    DevToSearchComponent,
    BirthdaysComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'firebaseApp'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    MatAutocompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
