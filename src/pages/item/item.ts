import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ItemPageData } from "../../domain/chez-lui.model";
import { NgForm } from "@angular/forms";
import { PhotosPage } from "../photos/photos";
import { AbstractPage } from "../common/AbstractPage";
import { SettingsData } from "../../providers/settings-data";

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
  title: string = "AJOUTER";

  pageData: ItemPageData = {
    modification: false,
    item: {
      uuid: "",
      tilte: "",
      description: "",
      price: 0,
      active: true,
      img: "",
      category: ""
    }
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public settingsData: SettingsData
  ) {
    super(navCtrl, settingsData);
  }

  ionViewDidLoad() {
    const param = this.navParams.data;
    this.pageData.modification = param.modification;

    if (this.pageData.modification) {
      this.title = "MODIFIER";
      this.pageData.item = param.item;
    } else {
      this.title = "AJOUTER";
    }
  }

  onSubmit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      console.log("valid");
    }
  }

  goToPhotos() {
    this.navCtrl.push(PhotosPage);
  }
}
