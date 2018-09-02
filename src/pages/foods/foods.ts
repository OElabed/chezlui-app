import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { ChezLuiData } from "../../providers/chezlui-data";
import { ItemCL } from "../../domain/chez-lui.model";
import { UserData } from "../../providers/user-data";

@Component({
  selector: "page-foods",
  templateUrl: "foods.html"
})
export class FoodsPage {
  foodType: string = "salee";
  sucreeList: Array<ItemCL> = [];
  saleeList: Array<ItemCL> = [];

  constructor(
    public dataProvider: ChezLuiData,
    public navCtrl: NavController,
    public userDataProvider: UserData
  ) {
    this.dataProvider.getFoods().subscribe((list: any[]) => {
      const listSucree = list.filter(item => item.type === "sucree")[0].items;
      const listSalee = list.filter(item => item.type === "salee")[0].items;

      listSucree.forEach(item => {
        this.sucreeList.push({
          tilte: item.tilte,
          description: item.description,
          price: item.price,
          active: item.active
        });
      });

      listSalee.forEach(item => {
        this.saleeList.push({
          tilte: item.tilte,
          description: item.description,
          price: item.price,
          active: item.active
        });
      });
    });
  }
}
