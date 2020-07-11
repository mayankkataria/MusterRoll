import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }

  display(units: string, value?: number, date?: Date) {
    let val = null;
    switch (units) {
      case 'hours': {
        val = value ? this.getHours12(null, value) : this.getHours12(date);
        break;
      }
      case 'minutes': {
        val = value ? value : this.getMinutes(date);
        break;
      }
    }
    return val < 10 ? `0${val}` : val;
  }

  getHours12(date?: Date, value?: number) {
    let hrs = null;
    hrs = date ? date.getHours() : value;
    return hrs < 12 ? hrs : hrs % 12;
  }

  getHours(date: Date) {
    return date.getHours();
  }

  getMinutes(date: Date) {
    return date.getMinutes();
  }

  getMeridiem(date: Date) {
    return date.toLocaleTimeString().split(' ')[1];
  }

}
