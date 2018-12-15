import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { DrinksListPage } from "../drinks-list/drinks-list";
import { ChezLuiData } from "../../providers/chezlui-data";
import { GroupCL } from "../../domain/chez-lui.model";
import { AbstractPublicPage } from "../common/AbstractPublicPage";
import { SettingsData } from "../../providers/settings-data";
import { UtilService } from "../../services/utils-service";

@Component({
  selector: "page-drinks",
  templateUrl: "drinks.html"
})
export class DrinksPage extends AbstractPublicPage {
  drinksGroup: Array<GroupCL> = [];

  constructor(
    public dataProvider: ChezLuiData,
    public navCtrl: NavController,
    public settingsData: SettingsData,
    public utilsService: UtilService
  ) {
    super(navCtrl, settingsData, utilsService);
  }

  ionViewWillEnter() {
    this.dataProvider.getDrinksList().subscribe((list: any[]) => {
      this.drinksGroup = [];
      list.forEach(item => {
        this.drinksGroup.push({
          uuid: item.uuid,
          type: item.type,
          title: item.title,
          img: item.icon,
          items: this.dataProvider.mapItemCLfromList(item.items)
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
