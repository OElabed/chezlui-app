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
import { ImageCropperModule } from 'ngx-image-cropper';

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
import { FormulePage } from '../pages/formule/formule';
import { FormuleItemPage } from '../pages/formule-item/formule-item';
import { Insomnia } from "@ionic-native/insomnia";
import { ScreenSaverPage } from '../pages/screen-saver/screen-saver';
import { AddPhotoPage } from '../pages/add-photo/add-photo';
import { UtilService } from '../services/utils-service';
import { CameraService } from '../services/camera-ervice';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    ChezLuiApp,
    HomePage,
    FoodsPage,
    DrinksPage,
    DrinksListPage,
    HookahPage,
    FormulePage,
    FormuleItemPage,
    InfosPage,
    LoginPage,
    SettingsPage,
    ItemPage,
    PhotosPage,
    AddPhotoPage,
    ScreenSaverPage,
    RippleEffectDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ImageCropperModule,
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
    FormulePage,
    FormuleItemPage,
    InfosPage,
    LoginPage,
    ItemPage,
    PhotosPage,
    AddPhotoPage,
    SettingsPage,
    ScreenSaverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    ChezLuiData,
    UserData,
    SettingsData,
    UtilService,
    Insomnia,
    CameraService,
    Camera,

    File,
    Transfer,
    FilePath,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
