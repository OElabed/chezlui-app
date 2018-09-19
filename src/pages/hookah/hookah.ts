import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { ItemCL } from "../../domain/chez-lui.model";
import { ChezLuiData } from "../../providers/chezlui-data";
import { UserData } from "../../providers/user-data";
import { ItemPage } from "../item/item";

@Component({
  selector: "page-hookah",
  templateUrl: "hookah.html"
})
export class HookahPage {
  hookahList: Array<ItemCL> = [];

  constructor(
    public dataProvider: ChezLuiData,
    public navCtrl: NavController,
    public userDataProvider: UserData,
    public alertCtrl: AlertController
  ) {
    this.displayHookahList().subscribe(data => {
      return data;
    });
  }

  displayHookahList() {
    return this.dataProvider.getHookahList().map((list: any[]) => {
      this.hookahList = [];
      list.forEach(item => {
        this.hookahList.push({
          uuid: item.uuid,
          tilte: item.tilte,
          description: item.description,
          price: item.price,
          active: item.active,
          img: item.img,
          category: item.category
        });
      });
      return true;
    });
  }

  showDeleteConfirm(item: ItemCL) {
    const confirm = this.alertCtrl.create({
      title: "Confirmation de la suppression",
      message: "Êtes-vous sûr de vouloir supprimer cet élément ?",
      buttons: [
        {
          text: "Annuler",
          handler: () => {
          }
        },
        {
          text: "Oui",
          handler: () => {
            this.dataProvider.deleteHookah(item).subscribe((result: boolean) => {
              this.displayHookahList().subscribe(data => {
                return data;
              });
            });
          }
        }
      ]
    });
    confirm.present();
  }

  itemActivation(item: ItemCL) {
    item.active = !item.active;
    this.dataProvider.updateHookah(item).subscribe((result:boolean) => {
      this.displayHookahList().subscribe(data => {
        return data;
      });
    });
  }


  goToAddItem() {
    this.navCtrl.push(ItemPage, { modification: false, item: null });
  }

  goToModifyItem(item: any) {
    this.navCtrl.push(ItemPage, { modification: true, item: item });
  }
}
