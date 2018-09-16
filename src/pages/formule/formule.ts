import { Component } from "@angular/core";
import { NavController, NavParams, AlertController, Events } from "ionic-angular";
import { ChezLuiData } from "../../providers/chezlui-data";
import { ItemCL } from "../../domain/chez-lui.model";
import { FormuleItemPage } from "../formule-item/formule-item";
import { UserData } from "../../providers/user-data";

/**
 * Generated class for the FormulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-formule",
  templateUrl: "formule.html"
})
export class FormulePage {
  formulesList: Array<ItemCL> = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataProvider: ChezLuiData,
    public userDataProvider: UserData,
    public alertCtrl: AlertController,
    public events: Events
  ) {}

  ionViewDidLoad() {
    this.displayFormuleList().subscribe(data => {
      return data;
    });
  }

  displayFormuleList() {
    return this.dataProvider.getFormulesList().map((list: any[]) => {
      this.formulesList = [];
      list.forEach(item => {
        this.formulesList.push({
          uuid: item.uuid,
          tilte: item.tilte,
          description: item.description,
          price: item.price,
          active: item.active,
          img: item.img
        });
      });
      return true;
    });
  }

  goToFormuleDetails(fromule: ItemCL) {
    // go to the session detail page
    // and pass in the session data
    this.navCtrl.push(FormuleItemPage, { formule: fromule });
  }

  showDeleteConfirm(event: Event, item: ItemCL) {
    event.stopPropagation();
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
              .deleteFormule(item)
              .subscribe((result: boolean) => {
                this.displayFormuleList().subscribe(data => {
                  return data;
                });
              });
          }
        }
      ]
    });
    confirm.present();
  }

  itemActivation(event: Event, item: ItemCL) {
    event.stopPropagation();
    item.active = !item.active;
    this.dataProvider.updateFormule(item).subscribe((result: boolean) => {
      this.displayFormuleList().subscribe(data => {
        return data;
      });
    });
  }
}
