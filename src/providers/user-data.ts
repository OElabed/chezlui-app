import { Injectable } from "@angular/core";
import { Events } from "ionic-angular";
import { Http } from "@angular/http";
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs/Observable";
import { UserOptions } from "../interfaces/user-options";

@Injectable()
export class UserData {
  data: any;
  currentUser: UserOptions;
  // TODO delete this line
  //currentUser: UserOptions = { username: "admin", password: "12345" };


  users_data: any;
  CHEZLUI_DATA_USERS = "users_data";

  constructor(
    public http: Http,
    public events: Events,
    public storage: Storage
  ) {}

  logout(): void {
    this.currentUser = null;
  }

  hasLoggedIn(): boolean {
    if (this.currentUser) {
      return true;
    }
    return false;
  }

  login(user: UserOptions): void {
    if (user) {
      this.currentUser = user;
    }
  }

  getUsers() {
    if (this.users_data) {
      return Observable.of(this.users_data);
    } else {
      return this.http
        .get("assets/data/data.json")
        .map((data: any) => {
          this.users_data = data.json().users;
          return this.users_data;
        }, this)
        .mergeMap((result: any) => {
          return Observable.fromPromise(
            this.storage.get(this.CHEZLUI_DATA_USERS).then(value => {
              if (value) {
                return value;
              }
              this.storage.set(this.CHEZLUI_DATA_USERS, result);
              return result;
            })
          );
        });
    }
  }
}
