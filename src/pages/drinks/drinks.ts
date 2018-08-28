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

  constructor(public dataProvider: ChezLuiData, public navCtrl: NavController) {
    this.dataProvider.getDrinks().subscribe((list: any[]) => {
      console.log(list);
      list.forEach(item => {
        this.drinksGroup.push({
          title: item.type,
          img: item.icon,
          items: item.items
        });
      });
      console.log(this.drinksGroup);
    });
  }

  goToDrinkTypeList(drinkGroup: any) {
    // go to the session detail page
    // and pass in the session data
    this.navCtrl.push(DrinksListPage, { group: drinkGroup });
  }
}
