import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { NgForm } from "@angular/forms";
import { UserOptions } from "../../interfaces/user-options";
import { UserData } from "../../providers/user-data";
import { ChezLuiApp } from "../../app/app.component";
import { AbstractPublicPage } from "../common/AbstractPublicPage";
import { SettingsData } from "../../providers/settings-data";
import { UtilService } from "../../services/utils-service";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage extends AbstractPublicPage {
  login: UserOptions = { username: "", password: "" };
  submitted = false;
  errorLogin = false;

  constructor(
    public dataProvider: UserData,
    public navCtrl: NavController,
    public settingsData: SettingsData,
    public utilsService: UtilService
  ) {
    super(navCtrl, settingsData, utilsService);
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.dataProvider.getUsers().subscribe((list: any[]) => {
        const userResult = list.filter(
          user =>
            user.username === this.login.username &&
            user.password === this.login.password
        )[0];
        if (userResult) {
          this.dataProvider.login(userResult);
          this.navCtrl.push(ChezLuiApp);
        } else {
          this.errorLogin = true;
        }
      });
    }
  }

  ionViewWillEnter() {
    this.errorLogin = false;
  }
}
