import { Injectable } from "@angular/core";
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class CameraService {
  base64Image: any;

  constructor(private camera: Camera) {}
  async takePhoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    return await this.camera.getPicture(options);
  }

  async selectImageFromCamera(): Promise<any> {
    return await new Promise((resolve, reject) => {
      let cameraOptions: CameraOptions = {
        destinationType: this.camera.DestinationType.DATA_URL,
        quality: 100,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };
      this.camera.getPicture(cameraOptions).then(
        data => {
          resolve("data:image/jpeg;base64," + data);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  async selectImageFromGallary(): Promise<any> {
    return await new Promise((resolve, reject) => {
      let cameraOptions: CameraOptions = {
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
        quality: 100,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      };
      this.camera.getPicture(cameraOptions).then(
        data => {
          resolve("data:image/jpeg;base64," + data);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  async getFileBase64(file): Promise<{}> {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}
