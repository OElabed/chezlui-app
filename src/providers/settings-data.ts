import { Injectable } from "@angular/core";
import { Events } from "ionic-angular";
import { Http } from "@angular/http";
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs/Observable";

@Injectable()
export class SettingsData {
  data: any;

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
    this.data = data.json().settings;

    return this.data;
  }


  getUsers() {
    return this.load().map((data: any) => {
      return data;
    });
  }

  getVIPSettings() {
    return this.load().map((data: any) => {
      return data.vip;
    });
  }
}
