import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { UserData } from "../providers/user-data";

@Component({
  templateUrl: "app.html"
})
export class ChezLuiApp {
  @ViewChild(Nav)
  nav: Nav;

  rootPage: any = HomePage;

  LOGOUT_PAGE_NAME: string = "LOGOUT";
  LOGIN_PAGE_NAME: string = "LOGIN";

  pages: Array<{ title: string; icon: string; component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public userDataProvider: UserData
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Home", icon: "home", component: HomePage },
      { title: "Login", icon: "log-in", component: LoginPage },
      { title: "Logout", icon: "log-out", component: ChezLuiApp }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title.toUpperCase() === this.LOGOUT_PAGE_NAME){
      this.userDataProvider.logout();
    }

    this.nav.setRoot(page.component);
  }

  isDisplayedPage(page): boolean {
    if(page.title.toUpperCase() === this.LOGIN_PAGE_NAME && this.userDataProvider.hasLoggedIn()) {
      return false;
    }

    if(page.title.toUpperCase() === this.LOGOUT_PAGE_NAME && !this.userDataProvider.hasLoggedIn()) {
      return false;
    }

    return true;
  }
}
