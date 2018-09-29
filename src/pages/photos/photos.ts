import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { AddPhotoPage } from "../add-photo/add-photo";
import { ChezLuiData } from "../../providers/chezlui-data";
import { PhotoData } from "../../domain/chez-lui.model";
import { SettingsData } from "../../providers/settings-data";
import { UtilService } from "../../services/utils-service";

/**
 * Generated class for the PhotosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-photos",
  templateUrl: "photos.html"
})
export class PhotosPage {
  drinksPhotos: PhotoData[] = [];
  foodsPhotos: PhotoData[] = [];
  hookahPhotos: PhotoData[] = [];

  selectedPhoto: PhotoData = {
    id: "",
    type: "",
    path: ""
  };

  baseDataFolder: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataProvider: ChezLuiData,
    public settingsData: SettingsData,
    public utilsService: UtilService
  ) {
    this.baseDataFolder = this.utilsService.getBaseDataFolder();

    this.dataProvider
      .getPhotosByType("drinks")
      .subscribe((data: PhotoData[]) => {
        this.drinksPhotos = data;
      });

    this.dataProvider
      .getPhotosByType("foods")
      .subscribe((data: PhotoData[]) => {
        this.foodsPhotos = data;
      });

    this.dataProvider
      .getPhotosByType("hookah")
      .subscribe((data: PhotoData[]) => {
        this.hookahPhotos = data;
      });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PhotosPage");
  }

  selectPhoto(photo: PhotoData) {
    this.selectedPhoto = photo;
  }

  goToAddPhoto() {
    this.navCtrl.push(AddPhotoPage);
  }
}
