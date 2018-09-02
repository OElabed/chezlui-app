import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { NgForm } from "@angular/forms";
import { UserOptions } from "../../interfaces/user-options";
import { UserData } from "../../providers/user-data";
import { ChezLuiApp } from "../../app/app.component";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public dataProvider: UserData,
    public navCtrl: NavController
  ) {}

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {

      this.dataProvider.getUsers().subscribe((list: any[]) => {

        const userResult = list.filter(user => user.username === this.login.username && user.password === this.login.password)[0];
        if(userResult) {
          this.dataProvider.login(userResult);
          this.navCtrl.push(ChezLuiApp);
        }
      });

    }
  }

}
