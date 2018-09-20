import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ItemCL } from "../../domain/chez-lui.model";
import { AbstractPage } from "../common/AbstractPage";

/**
 * Generated class for the FormuleItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-formule-item",
  templateUrl: "formule-item.html"
})
export class FormuleItemPage extends AbstractPage {
  formule: ItemCL;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super(navCtrl);
  }

  ionViewWillEnter() {
    this.formule = this.navParams.data.formule;
  }
}
