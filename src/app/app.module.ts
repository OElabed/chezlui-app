import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { ChezLuiApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FoodsPage } from '../pages/foods/foods';
import { DrinksPage } from '../pages/drinks/drinks';
import { DrinksListPage } from '../pages/drinks-list/drinks-list';

@NgModule({
  declarations: [
    ChezLuiApp,
    HomePage,
    FoodsPage,
    DrinksPage,
    DrinksListPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(ChezLuiApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChezLuiApp,
    HomePage,
    FoodsPage,
    DrinksPage,
    DrinksListPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
