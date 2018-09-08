import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { DrinksListPage } from "../drinks-list/drinks-list";
import { ChezLuiData } from "../../providers/chezlui-data";
import { GroupCL } from "../../domain/chez-lui.model";

@Component({
  selector: "page-drinks",
  templateUrl: "drinks.html"
})
export class DrinksPage {
  drinksGroup: Array<GroupCL> = [];

  constructor(
    public dataProvider: ChezLuiData,
    public navCtrl: NavController
  ) {}

  ionViewWillEnter() {
    this.dataProvider.getDrinksList().subscribe((list: any[]) => {
      this.drinksGroup = [];
      list.forEach(item => {
        this.drinksGroup.push({
          uuid: item.uuid,
          type: item.type,
          title: item.title,
          img: item.icon,
          items: item.items
        });
      });
    });
  }

  goToDrinkTypeList(drinkGroup: GroupCL) {
    // go to the session detail page
    // and pass in the session data
    this.navCtrl.push(DrinksListPage, { group: drinkGroup });
  }
}
