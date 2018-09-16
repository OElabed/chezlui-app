import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs/Observable";
import { SettingsData } from "./settings-data";
import { ItemCL, GroupCL } from "../domain/chez-lui.model";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/mergeMap";
import { UUID } from "angular2-uuid";
import { File } from "@ionic-native/file";

@Injectable()
export class ChezLuiData {
  CHEZLUI_DATA_FOODS = "foods_data";

  CHEZLUI_DATA_DRINKS = "drinks_data";

  CHEZLUI_DATA_HOOKAH = "hookah_data";

  constructor(
    public http: Http,
    public storage: Storage,
    public settingsData: SettingsData,
    public file: File
  ) {}

  saveList(storageId: string, data: any) {
    this.storage.set(storageId, data);
  }

  /** ============================================
   *                  STORAGE
   * =============================================
   */

  initAllData() {
    const assetDirectory = this.file.applicationDirectory + "www/assets/";
    return Observable.fromPromise(
      this.file
        .checkDir(this.file.dataDirectory, "data/")
        .then(_ => {
          return false;
        })
        .catch(error => {
          this.file
            .copyDir(assetDirectory, "data/", this.file.dataDirectory, "data/")
            .then(data => {
              // this.file
              //   .listDir(this.file.dataDirectory, "data/imgs/drinks/cafe/")
              //   .then(entry => {
              //     // this.coucou = JSON.stringify(entry);
              //     return true;
              //   })
              //   .catch(error => {
              //     return false;
              //   });
                return true;
            })
            .catch(error => {
              return false;
            });
        })
    );
  }

  // Copy the image to a local folder
  public copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file
      .copyFile(namePath, currentName, this.file.dataDirectory, newFileName)
      .then(
        success => {
          //this.placeItem.images = this.file.dataDirectory+newFileName;
        },
        error => {
          console.log("error");
        }
      );
  }

  /** ============================================
   *                  IMAGES
   * =============================================
   */

  /** ============================================
   *                  HOOKAH
   * =============================================
   */

  getHookahList() {
    return this.http
      .get("assets/data/data.json")
      .map((data: any) => {
        return data.json().hookah;
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

  getHookah(uuid: string) {
    return this.getHookahList().map((data: any[]) => {
      let result: ItemCL;
      data.forEach((item: ItemCL) => {
        if (item.uuid === uuid) {
          result = item;
        }
      });
      return result;
    });
  }

  addHookah(hookah: ItemCL) {
    return this.getHookahList().map((data: any[]) => {
      hookah.uuid = UUID.UUID();
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

  /** ============================================
   *                  DRINKS
   * =============================================
   */

  getDrinksList() {
    return this.http
      .get("assets/data/data.json")
      .map((data: any) => {
        return data.json().drinks;
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

  getDrink(uuid: string, uuid_group: string) {
    return this.getDrinksList().map((data: any[]) => {
      let result: ItemCL;
      data.forEach((group_item: GroupCL) => {
        if (group_item.uuid === uuid_group) {
          group_item.items.forEach((item: ItemCL, index) => {
            if (item.uuid === uuid) {
              result = item;
            }
          });
        }
      });
      return result;
    });
  }

  addDrink(drink: ItemCL, uuid_group: string) {
    return this.getDrinksList().map((data: any[]) => {
      const newData: GroupCL[] = [];
      data.forEach((group_item: GroupCL) => {
        const new_group_item = group_item;
        if (group_item.uuid === uuid_group) {
          drink.uuid = UUID.UUID();
          new_group_item.items.push(drink);
        }
        newData.push(new_group_item);
      });

      this.saveList(this.CHEZLUI_DATA_DRINKS, newData);
      return true;
    });
  }

  updateDrink(drink: ItemCL, uuid_group: string) {
    return this.getDrinksList().map((data: any[]) => {
      let indexGroupToUpdate;
      let indexIemToUpdate;
      data.forEach((group_item: GroupCL, indexGroup) => {
        if (group_item.uuid === uuid_group) {
          group_item.items.forEach((item: ItemCL, index) => {
            if (item.uuid === drink.uuid) {
              indexGroupToUpdate = indexGroup;
              indexIemToUpdate = index;
            }
          });
        }
      });

      if (!isNaN(indexGroupToUpdate) && !isNaN(indexIemToUpdate)) {
        data[indexGroupToUpdate].items[indexIemToUpdate] = drink;
      }
      this.saveList(this.CHEZLUI_DATA_DRINKS, data);
      return true;
    });
  }

  deleteDrink(drink: ItemCL, uuid_group: string) {
    return this.getDrinksList().map((data: any[]) => {
      const newData: GroupCL[] = [];
      data.forEach((group_item: GroupCL) => {
        let new_group_item: GroupCL = group_item;
        if (group_item.uuid === uuid_group) {
          let newItems: ItemCL[] = [];
          group_item.items.forEach((item: ItemCL) => {
            if (item.uuid !== drink.uuid) {
              newItems.push(item);
            }
          });
          new_group_item.items = newItems;
        }
        newData.push(new_group_item);
      });
      this.saveList(this.CHEZLUI_DATA_DRINKS, newData);
      return true;
    });
  }

  /** ============================================
   *                  FOODS
   * =============================================
   */

  getFoodsList() {
    return this.http
      .get("assets/data/data.json")
      .map((data: any) => {
        return data.json().foods;
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

  getFood(uuid: string, type: string) {
    return this.getFoodsList().map((data: any[]) => {
      let result: ItemCL;
      data.forEach((group_item: GroupCL) => {
        if (group_item.type === type) {
          group_item.items.forEach((item: ItemCL, index) => {
            if (item.uuid === uuid) {
              result = item;
            }
          });
        }
      });
      return result;
    });
  }

  addFood(food: ItemCL, type: string) {
    return this.getFoodsList().map((data: any[]) => {
      const newData: GroupCL[] = [];
      data.forEach((group_item: GroupCL) => {
        const new_group_item = group_item;
        if (group_item.type === type) {
          food.uuid = UUID.UUID();
          new_group_item.items.push(food);
        }
        newData.push(new_group_item);
      });

      this.saveList(this.CHEZLUI_DATA_FOODS, newData);
      return true;
    });
  }

  updateFood(food: ItemCL, type: string) {
    return this.getFoodsList().map((data: any[]) => {
      let indexGroupToUpdate;
      let indexIemToUpdate;
      data.forEach((group_item: GroupCL, indexGroup) => {
        if (group_item.type === type) {
          group_item.items.forEach((item: ItemCL, index) => {
            if (item.uuid === food.uuid) {
              indexGroupToUpdate = indexGroup;
              indexIemToUpdate = index;
            }
          });
        }
      });

      if (!isNaN(indexGroupToUpdate) && !isNaN(indexIemToUpdate)) {
        data[indexGroupToUpdate].items[indexIemToUpdate] = food;
      }
      this.saveList(this.CHEZLUI_DATA_FOODS, data);
      return true;
    });
  }

  deleteFood(food: ItemCL, type: string) {
    return this.getFoodsList().map((data: any[]) => {
      const newData: GroupCL[] = [];
      data.forEach((group_item: GroupCL) => {
        let new_group_item: GroupCL = group_item;
        if (group_item.type === type) {
          let newItems: ItemCL[] = [];
          group_item.items.forEach((item: ItemCL) => {
            if (item.uuid !== food.uuid) {
              newItems.push(item);
            }
          });
          new_group_item.items = newItems;
        }
        newData.push(new_group_item);
      });
      this.saveList(this.CHEZLUI_DATA_FOODS, newData);
      return true;
    });
  }
}
