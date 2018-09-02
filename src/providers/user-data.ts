import { Injectable } from "@angular/core";
import { Events } from "ionic-angular";
import { Http } from "@angular/http";
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs/Observable";
import { UserOptions } from "../interfaces/user-options";

@Injectable()
export class UserData {
  data: any;
  currentUser: UserOptions = { username: "admin", password: "12345" };

  constructor(
    public http: Http,
    public events: Events,
    public storage: Storage
  ) {}

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get("assets/data/data.json").map(this.processData, this);
    }
  }

  processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions
    this.data = data.json().users;

    return this.data;
  }

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
    return this.load().map((data: any) => {
      return data;
    });
  }
}
