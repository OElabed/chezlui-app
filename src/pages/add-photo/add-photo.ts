import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { UtilService } from "../../services/utils-service";
import { CameraService } from "../../services/camera-ervice";

/**
 * Generated class for the AddPhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-add-photo",
  templateUrl: "add-photo.html"
})
export class AddPhotoPage {
  isCordova: boolean;
  imageBase64Data: any;
  imageChangedEvent: any = "";
  croppedImage: any = "";
  cropperReady = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utilService: UtilService,
    public cameraService: CameraService
  ) {
    this.utilService.isCordova().then(value => {
      this.isCordova = value;
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddPhotoPage");
  }

  selectImageFromCamera() {
    this.cameraService
      .selectImageFromCamera()
      .then((data: any) => {
        this.imageBase64Data = data;
      })
      .catch((error: any) => {
        console.dir(error);
      });
  }
  selectImageFromGallary() {
    this.cameraService
      .selectImageFromGallary()
      .then((data: any) => {
        this.imageBase64Data = data;
      })
      .catch((error: any) => {
        console.dir(error);
      });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCroppedBase64(image: string) {
    console.log(image);
    this.croppedImage = image;
  }
  imageLoaded() {
    this.cropperReady = true;
  }
  imageLoadFailed() {
    console.log("Load failed");
  }
}
