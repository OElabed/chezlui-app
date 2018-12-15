import { Component } from "@angular/core";
import { NavController, NavParams, Events } from "ionic-angular";
import { ItemPageData } from "../../domain/chez-lui.model";
import { NgForm } from "@angular/forms";
import { PhotosPage } from "../photos/photos";
import { AbstractPage } from "../common/AbstractPage";
import { UtilService } from "../../services/utils-service";
import { ChezLuiData } from "../../providers/chezlui-data";

/**
 * Generated class for the ItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: "page-item",
  templateUrl: "item.html"
})
export class ItemPage extends AbstractPage {
  submitted = false;
  titlePage: string = "AJOUTER";
  type: string = "";
  group: string = "";

  pageData: ItemPageData = {
    modification: false,
    item: {
      uuid: "",
      title: "",
      description: "",
      price_vip: 0,
      price: 0,
      active: true,
      img: {
        id: "",
        type: "",
        path: ""
      },
      category: ""
    }
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utilsService: UtilService,
    private events: Events,
    public dataProvider: ChezLuiData
  ) {
    super(utilsService);
  }

  ionViewWillEnter() {
    this.submitted = false;
    const param = this.navParams.data;
    this.pageData.modification = param.modification;
    this.type = param.type;

    if (param.group) {
      this.group = param.group;
    }

    if (this.pageData.modification) {
      this.titlePage = "MODIFIER";
      this.pageData.item = param.item;
    } else {
      this.titlePage = "AJOUTER";
    }

    this.events.subscribe("change-photo-events", paramsVar => {
      // Do stuff with "paramsVar"
      this.pageData.item.img = paramsVar;
      //this.events.unsubscribe('custom-user-events'); // unsubscribe this event
    });
  }

  goToPhotos() {
    this.navCtrl.push(PhotosPage, { img: this.pageData.item.img });
  }

  maximumValue(item): boolean {
    if (!isNaN(item) && item <= 100) {
      return true;
    }
    return false;
  }

  onSubmit(form: NgForm) {
    this.submitted = true;

    if (
      form.valid &&
      this.pageData.item.price_vip &&
      this.pageData.item.price &&
      this.maximumValue(this.pageData.item.price_vip) &&
      this.maximumValue(this.pageData.item.price) &&
      this.pageData.item.price_vip >= this.pageData.item.price
    ) {
      if (this.type.toUpperCase() === "HOOKAH") {
        this.dataProvider.updateHookah(this.pageData.item).subscribe(() => {
          this.navCtrl.pop();
        });
      }

      if (this.group && this.type.toUpperCase() === "DRINKS") {
        this.dataProvider
          .updateDrink(this.pageData.item, this.group)
          .subscribe(() => {
            this.navCtrl.pop();
          });
      }

      if (this.type.toUpperCase() === "FOODS") {
        this.dataProvider
          .updateFood(this.pageData.item, this.group)
          .subscribe(() => {
            this.navCtrl.pop();
          });
      }
    }
  }
}
