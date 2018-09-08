import { Injectable } from "@angular/core";

import { Http } from "@angular/http";
import { Storage } from "@ionic/storage";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/mergeMap";
import { SettingsData } from "./settings-data";
import { ItemCL } from "../domain/chez-lui.model";

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

  getFoodsList() {

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

  getDrinksList() {

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

  saveList(storageId: string, data: any) {
    this.storage.set(storageId, data);
  }

  /** ============================================
   *                  HOOKAH
   * =============================================
   */


  getHookahList() {

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

  getHookah(uuid: string) {
    return this.getHookahList().map((data: any[]) => {
      let result: ItemCL;
      data.forEach((item: ItemCL, index) => {
        if (item.uuid === uuid) {
          result = item;
        }
      });
      return result;
    });
  }

  addHookah(hookah: ItemCL) {
    return this.getHookahList().map((data: any[]) => {

      data.push(hookah);
      this.saveList(this.CHEZLUI_DATA_HOOKAH, data);
      return true;
    });
  }

  updateHookah(hookah: ItemCL) {
    return this.getHookahList().map((data: any[]) => {
      let indexUpdate = 0;
      data.forEach((item: ItemCL, index) => {
        if (item.uuid === hookah.uuid) {
          indexUpdate = index;
        }
      });
      data[indexUpdate] = hookah;
      this.saveList(this.CHEZLUI_DATA_HOOKAH, data);
      return true;
    });
  }

  deleteHookah(hookah: any) {
    return this.getHookahList().map((data: any[]) => {
      let newList: ItemCL[] = [];
      data.forEach((item: ItemCL, index) => {
        if (item.uuid !== hookah.uuid) {
          newList.push(item);
        }
      });

      this.saveList(this.CHEZLUI_DATA_HOOKAH, newList);
      return true;
    });
  }
}
