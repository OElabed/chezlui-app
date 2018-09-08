import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";
import { GroupCL, ItemCL } from "../../domain/chez-lui.model";
import { UserData } from "../../providers/user-data";
import { ChezLuiData } from "../../providers/chezlui-data";

@Component({
  selector: "page-drinks-list",
  templateUrl: "drinks-list.html"
})
export class DrinksListPage {
  group: GroupCL;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userDataProvider: UserData,
    public alertCtrl: AlertController,
    public dataProvider: ChezLuiData
  ) {}

  ionViewWillEnter() {
    this.group = this.navParams.data.group;
  }

  displayDrinksList() {
    return this.dataProvider.getDrinksList().map((list: any[]) => {
      list.forEach((element: GroupCL) => {
        if (this.group.uuid === element.uuid) {
          console.log(element);
          this.group = element;
        }
      });
      return true;
    });
  }

  showDeleteConfirm(item: ItemCL, group_uuid: string) {
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
              .deleteDrink(item, group_uuid)
              .subscribe((result: boolean) => {
                this.displayDrinksList().subscribe(data => {
                  return data;
                });
              });
          }
        }
      ]
    });
    confirm.present();
  }

  itemActivation(item: ItemCL, group_uuid: string) {
    item.active = !item.active;
    this.dataProvider
      .updateDrink(item, group_uuid)
      .subscribe((result: boolean) => {
        this.displayDrinksList().subscribe(data => {
          return data;
        });
      });
  }
}
