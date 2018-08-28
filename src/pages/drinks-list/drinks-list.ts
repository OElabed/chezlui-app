import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { GroupCL } from "../../domain/chez-lui.model";

@Component({
  selector: "page-drinks-list",
  templateUrl: "drinks-list.html"
})
export class DrinksListPage {
  group: GroupCL;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewWillEnter() {
    console.log(this.navParams)
    this.group = this.navParams.data.group;
    console.log(this.navParams.data.group);
  }
}
