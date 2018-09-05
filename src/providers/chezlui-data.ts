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

  foods_data: any;
  CHEZLUI_DATA_FOODS = "foods_data";

  drinks_data: any;
  CHEZLUI_DATA_DRINKS = "drinks_data";

  hookah_data: any;
  CHEZLUI_DATA_HOOKAH = "hookah_data";

  constructor(
    public http: Http,
    public storage: Storage,
    public settingsData: SettingsData
  ) {}

  getFoods() {

    if (this.foods_data) {
      return Observable.of(this.foods_data);
    } else {
      return this.http
        .get("assets/data/data.json")
        .map((data: any) => {
          this.foods_data = data.json().foods;
          return this.foods_data;
        }, this)
        .mergeMap((result: any) => {
          return Observable.fromPromise(
            this.storage.get(this.CHEZLUI_DATA_FOODS).then(value => {
              if (value) {
                return value;
              }
              this.storage.set(this.CHEZLUI_DATA_FOODS, result);
              return result;
            })
          );
        });
    }
  }

  getDrinks() {

    if (this.drinks_data) {
      return Observable.of(this.drinks_data);
    } else {
      return this.http
        .get("assets/data/data.json")
        .map((data: any) => {
          this.drinks_data = data.json().drinks;
          return this.drinks_data;
        }, this)
        .mergeMap((result: any) => {
          return Observable.fromPromise(
            this.storage.get(this.CHEZLUI_DATA_DRINKS).then(value => {
              if (value) {
                return value;
              }
              this.storage.set(this.CHEZLUI_DATA_DRINKS, result);
              return result;
            })
          );
        });
    }
  }

  getHookah() {

    if (this.hookah_data) {
      return Observable.of(this.hookah_data);
    } else {
      return this.http
        .get("assets/data/data.json")
        .map((data: any) => {
          this.hookah_data = data.json().hookah;
          return this.hookah_data;
        }, this)
        .mergeMap((result: any) => {
          return Observable.fromPromise(
            this.storage.get(this.CHEZLUI_DATA_HOOKAH).then(value => {
              if (value) {
                return value;
              }
              this.storage.set(this.CHEZLUI_DATA_HOOKAH, result);
              return result;
            })
          );
        });
    }
  }
}
