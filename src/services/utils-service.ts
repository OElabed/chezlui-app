import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { File } from "@ionic-native/file";

@Injectable()
export class UtilService {
  constructor(private platform: Platform, private file: File) {}

  async isCordova() {
    return await this.platform
      .ready()
      .then(async () => {
        return await new Promise(resolve => {
          resolve(this.platform.is("cordova"));
        });
      })
      .then((result: boolean) => {
        return result;
      });
  }

  getBaseDataFolder(): string {
    this.isCordova().then(value => {
      return this.file.dataDirectory;
    });
    return "assets/";
  }
}
