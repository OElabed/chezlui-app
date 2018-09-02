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
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ChezLuiData,
    UserData,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
