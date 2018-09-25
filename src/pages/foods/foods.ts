import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { ChezLuiData } from "../../providers/chezlui-data";
import { GroupCL, ItemCL } from "../../domain/chez-lui.model";
import { UserData } from "../../providers/user-data";
import { AbstractPage } from "../common/AbstractPage";
import { SettingsData } from "../../providers/settings-data";
import { UtilService } from "../../services/utils-service";
import { ItemPage } from "../item/item";

@Component({
  selector: "page-foods",
  templateUrl: "foods.html"
})
export class FoodsPage extends AbstractPage {
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

  saleeCategories: string[] = [];
  saleeCategoriesActiveMap: Map<string, number> = new Map<string, number>();

  constructor(
    public dataProvider: ChezLuiData,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public userDataProvider: UserData,
    public settingsData: SettingsData,
    public utilsService: UtilService
  ) {
    super(navCtrl, settingsData, utilsService);
  }

  ionViewWillEnter() {
    super.ionViewDidEnter();
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

      this.saleeCategoriesActiveMap = new Map<string, number>();
      this.saleeCategories = [];

      saleeGroupResult.items.map((item: ItemCL) => {
        const result = this.saleeCategories.filter(
          category => item.category === category
        );
        if (result.length === 0) {
          this.saleeCategories.push(item.category);
          if (item.active) {
            this.saleeCategoriesActiveMap.set(item.category, 1);
          } else {
            this.saleeCategoriesActiveMap.set(item.category, 0);
          }
        } else {
          if (item.active) {
            let count = this.saleeCategoriesActiveMap.get(item.category);
            count++;
            this.saleeCategoriesActiveMap.set(item.category, count);
          }
        }
      });

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
    this.dataProvider.updateFood(item, type).subscribe((result: boolean) => {
      this.displayFoodsList().subscribe(data => {
        return data;
      });
    });
  }

  goToAddItem() {
    this.navCtrl.push(ItemPage, { modification: false, item: null });
  }
}
