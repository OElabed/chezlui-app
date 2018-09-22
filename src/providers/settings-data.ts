import { Injectable } from "@angular/core";
import { Events } from "ionic-angular";
import { Http } from "@angular/http";
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs/Observable";
import { VipSettingsCL } from "../domain/chez-lui.model";

@Injectable()
export class SettingsData {
  data: any;

  CHEZLUI_DATA_SETTINGS = "settings_data";

  constructor(
    public http: Http,
    public events: Events,
    public storage: Storage
  ) {}

  getSettings() {
    return this.http
      .get("assets/data/data.json")
      .map((data: any) => {
        return data.json().settings;
      }, this)
      .mergeMap((result: any) => {
        return Observable.fromPromise(
          this.storage.get(this.CHEZLUI_DATA_SETTINGS).then(value => {
            if (value) {
              return value;
            }
            this.storage.set(this.CHEZLUI_DATA_SETTINGS, result);
            return result;
          })
        );
      });
  }

  getVIPSettings() {
    return this.getSettings().map((data: any) => {
      const vip: VipSettingsCL = {
        delta: data.vip.delta,
        active: data.vip.active
      };
      return vip;
    });
  }

  saveSettings(settings: any) {
    this.storage.set(this.CHEZLUI_DATA_SETTINGS, settings);
  }

  saveVIPSettings(vip: any) {
    return this.getSettings().map((data: any) => {
      data.vip = vip;
      this.saveSettings(data);
      return true;
    });
  }
}
