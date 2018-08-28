import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class ChezLuiData {
  data: any;

  constructor(public http: Http) { }

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get('assets/data/data.json')
        .map(this.processData, this);
    }
  }

  processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions
    this.data = data.json();

    // this.data.tracks = [];

    // this.data.foods = [];

    // // loop through each day in the schedule
    // this.data.schedule.forEach((day: any) => {
    //   // loop through each timeline group in the day
    //   day.groups.forEach((group: any) => {
    //     // loop through each session in the timeline group
    //     group.sessions.forEach((session: any) => {
    //       session.speakers = [];
    //       if (session.speakerNames) {
    //         session.speakerNames.forEach((speakerName: any) => {
    //           let speaker = this.data.speakers.find((s: any) => s.name === speakerName);
    //           if (speaker) {
    //             session.speakers.push(speaker);
    //             speaker.sessions = speaker.sessions || [];
    //             speaker.sessions.push(session);
    //           }
    //         });
    //       }

    //       if (session.tracks) {
    //         session.tracks.forEach((track: any) => {
    //           if (this.data.tracks.indexOf(track) < 0) {
    //             this.data.tracks.push(track);
    //           }
    //         });
    //       }
    //     });
    //   });
    // });

    return this.data;
  }

  // getSpeakers() {
  //   return this.load().map((data: any) => {
  //     return data.speakers.sort((a: any, b: any) => {
  //       let aName = a.name.split(' ').pop();
  //       let bName = b.name.split(' ').pop();
  //       return aName.localeCompare(bName);
  //     });
  //   });
  // }

  // getTracks() {
  //   return this.load().map((data: any) => {
  //     return data.tracks.sort();
  //   });
  // }

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

  // getMap() {
  //   return this.load().map((data: any) => {
  //     return data.map;
  //   });
  // }



}
