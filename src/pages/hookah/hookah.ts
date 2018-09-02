import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { ItemCL } from "../../domain/chez-lui.model";
import { ChezLuiData } from "../../providers/chezlui-data";
import { UserData } from "../../providers/user-data";

@Component({
  selector: "page-hookah",
  templateUrl: "hookah.html"
})
export class HookahPage {
  hookahList: Array<ItemCL> = [];

  constructor(
    public dataProvider: ChezLuiData,
    public navCtrl: NavController,
    public userDataProvider: UserData
  ) {
    this.dataProvider.getHookah().subscribe((list: any[]) => {
      list.forEach(item => {
        this.hookahList.push({
          tilte: item.tilte,
          description: item.description,
          price: item.price,
          active: item.active
        });
      });
    });
  }
}
