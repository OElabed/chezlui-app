import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { ChezLuiApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FoodsPage } from '../pages/foods/foods';
import { DrinksPage } from '../pages/drinks/drinks';
import { DrinksListPage } from '../pages/drinks-list/drinks-list';
import { RippleEffectDirective } from '../directives/ripple-effect.directive';
import { ChezLuiData } from '../providers/chezlui-data';
import { HttpModule } from '@angular/http';
import { HookahPage } from '../pages/hookah/hookah';
import { IonicStorageModule } from '@ionic/storage';
import { UserData } from '../providers/user-data';
import { InfosPage } from '../pages/infos/infos';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SettingsData } from '../providers/settings-data';
import { ItemPage } from '../pages/item/item';
import { PhotosPage } from '../pages/photos/photos';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';

@NgModule({
  declarations: [
    ChezLuiApp,
    HomePage,
    FoodsPage,
    DrinksPage,
    DrinksListPage,
    HookahPage,
    InfosPage,
    LoginPage,
    SettingsPage,
    ItemPage,
    PhotosPage,
    RippleEffectDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(ChezLuiApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChezLuiApp,
    HomePage,
    FoodsPage,
    DrinksPage,
    DrinksListPage,
    HookahPage,
    InfosPage,
    LoginPage,
    ItemPage,
    PhotosPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    ChezLuiData,
    UserData,
    SettingsData,

    File,
    Transfer,
    FilePath,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
