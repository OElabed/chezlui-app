import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { ChezLuiData } from "../../providers/chezlui-data";
import { GroupCL, ItemCL } from "../../domain/chez-lui.model";
import { UserData } from "../../providers/user-data";

@Component({
  selector: "page-foods",
  templateUrl: "foods.html"
})
export class FoodsPage {
  foodType: string = "salee";
  sucreeGroup: GroupCL = {
    uuid: null,
    title: null,
    type: null,
    img: null,
    items: []
  };
  saleeGroup: GroupCL = {
    uuid: null,
    title: null,
    type: null,
    img: null,
    items: []
  };

  constructor(
    public dataProvider: ChezLuiData,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public userDataProvider: UserData
  ) {
    this.displayFoodsList().subscribe((data: boolean) => {
      return data;
    });
  }

  displayFoodsList() {
    return this.dataProvider.getFoodsList().map((list: any[]) => {
      const sucreeGroupResult = list.filter(item => item.type === "sucree")[0];
      const saleeGroupResult = list.filter(item => item.type === "salee")[0];

      this.sucreeGroup = {
        uuid: null,
        title: null,
        type: sucreeGroupResult.type,
        img: null,
        items: sucreeGroupResult.items
      };

      this.saleeGroup = {
        uuid: null,
        title: null,
        type: saleeGroupResult.type,
        img: null,
        items: saleeGroupResult.items
      };
      return true;
    });
  }

  showDeleteConfirm(item: ItemCL, type: string) {
    const confirm = this.alertCtrl.create({
      title: "Confirmation de la suppression",
      message: "Êtes-vous sûr de vouloir supprimer cet élément ?",
      buttons: [
        {
          text: "Annuler",
          handler: () => {}
        },
        {
          text: "Oui",
          handler: () => {
            this.dataProvider
              .deleteFood(item, type)
              .subscribe((result: boolean) => {
                this.displayFoodsList().subscribe(data => {
                  return data;
                });
              });
          }
        }
      ]
    });
    confirm.present();
  }

  itemActivation(item: ItemCL, type: string) {
    item.active = !item.active;
    this.dataProvider
      .updateFood(item, type)
      .subscribe((result: boolean) => {
        this.displayFoodsList().subscribe(data => {
          return data;
        });
      });
  }

}
