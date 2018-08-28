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
import { RippleEffectDirective } from '../directives/ripple-effect.directive';
import { ChezLuiData } from '../providers/chezlui-data';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    ChezLuiApp,
    HomePage,
    FoodsPage,
    DrinksPage,
    DrinksListPage,
    ListPage,
    RippleEffectDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
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
    ChezLuiData,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
