import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { ItemCL } from "../../domain/chez-lui.model";
import { ChezLuiData } from "../../providers/chezlui-data";
import { UserData } from "../../providers/user-data";
import { ItemPage } from "../item/item";
import { AbstractPublicPage } from "../common/AbstractPublicPage";
import { SettingsData } from "../../providers/settings-data";
import { UtilService } from "../../services/utils-service";

@Component({
  selector: "page-hookah",
  templateUrl: "hookah.html"
})
export class HookahPage extends AbstractPublicPage {
  hookahList: Array<ItemCL> = [];

  constructor(
    public dataProvider: ChezLuiData,
    public navCtrl: NavController,
    public userDataProvider: UserData,
    public alertCtrl: AlertController,
    public settingsData: SettingsData,
    public utilsService: UtilService
  ) {
    super(navCtrl, settingsData, utilsService);
  }

  ionViewWillEnter() {
    super.ionViewDidEnter();
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
          title: item.title,
          description: item.description,
          price: item.price,
          price_vip: item.price_vip,
          active: item.active,
          img: this.dataProvider.getPhotoById(item.img),
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
          handler: () => {}
        },
        {
          text: "Oui",
          handler: () => {
            this.dataProvider
              .deleteHookah(item)
              .subscribe((result: boolean) => {
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
    this.dataProvider.updateHookah(item).subscribe((result: boolean) => {
      this.displayHookahList().subscribe(data => {
        return data;
      });
    });
  }

  goToAddItem() {
    this.navCtrl.push(ItemPage, { modification: false, item: null });
  }

  goToEditItem(item: ItemCL) {
    this.navCtrl.push(ItemPage, {
      modification: true,
      item: item,
      type: "HOOKAH"
    });
  }
}
