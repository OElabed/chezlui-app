import { Injectable } from "@angular/core";

import { Http } from "@angular/http";
import { Storage } from "@ionic/storage";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/mergeMap";
import { SettingsData } from "./settings-data";

@Injectable()
export class ChezLuiData {
  data: any;
  CHEZLUI_DATA = "data";

  constructor(
    public http: Http,
    public storage: Storage,
    public settingsData: SettingsData
  ) {}

  load(): any {
    // this.storage.get(this.CHEZLUI_DATA).then(value => {
    //   return value;
    // });

    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http
        .get("assets/data/data.json")
        .map(this.processData, this)
        .mergeMap((result: any) => {
          return Observable.fromPromise(
            this.storage.get(this.CHEZLUI_DATA).then(value => {
              if (value) {
                return value;
              }
              this.storage.set(this.CHEZLUI_DATA, result);
              return result;
            })
          );
        });
    }
  }

  processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions
    this.data = data.json();

    return this.data;
  }

  getFoods() {
    return this.load().map((data: any) => {
      return data.foods;
    });
  }

  getDrinks() {
    return this.load().map((data: any) => {
      return data.drinks;
    });
  }

  getHookah() {
    return this.load().map((data: any) => {
      return data.hookah;
    });
  }
}
