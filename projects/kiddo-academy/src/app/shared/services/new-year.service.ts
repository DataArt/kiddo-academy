import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewYearService {

  constructor() { }

  isNewYear(): boolean {
    const now = new Date();
    const start = new Date(now.getFullYear(), 11, 20);
    const end = new Date(now.getFullYear(), 1, 1);
    console.log({now, start, end});

    return now.getTime() > start.getTime() || now.getTime() < end.getTime();
  }
}
