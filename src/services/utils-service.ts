import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";

@Injectable()
export class UtilService {
  constructor(private platform: Platform) {}

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
}
