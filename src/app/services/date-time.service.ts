import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }

  display(units: string, value?: number, date?: Date) {
    // console.log('value: ', value);
    let val = 0;
    switch (units) {
      case 'hours': {
        val = value || value === 0 ? this.getHours12(null, value) : this.getHours12(date);
        break;
      }
      case 'minutes': {
        val = value || value === 0 ? value : this.getMinutes(date);
        break;
      }
      case 'seconds': {
        val = value;
      }
    }
    return val < 10 ? `0${val}` : `${val}`;
  }

  getHours12(date?: Date, value?: number) {
    let hrs = null;
    // if (value && value === 0) {
    //   return value;
    // }
    hrs = date ? date.getHours() : value;
    return hrs < 12 ? hrs : hrs % 12;
  }

  getHours(date: Date) {
    return date.getHours();
  }

  getMinutes(date: Date) {
    return date.getMinutes();
  }

  getMeridiem(date?: Date, hr?: number) {
    return date ? date.toLocaleTimeString().split(' ')[1] : hr > 12 ? 'PM' : 'AM' ;
  }

  inInterval({startHr, startMin}, {endHr, endMin}, {currentHr, currentMin}) {
    // console.log('start hr: ', startHr);
    // console.log('start min: ', startMin);
    // console.log('end hr: ', endHr);
    // console.log('end min: ', endMin);
    // console.log('cur hr: ', currentHr);
    // console.log('cur min: ', currentMin);
    console.log('in interval');

    if (currentHr > startHr && currentHr < endHr) {
      return true;
    } else if (currentHr === startHr) {
      return currentMin >= startMin;
    } else if (currentHr === endHr) {
      return currentMin <= endMin;
    } else {
      return false;
    }
  }

}
