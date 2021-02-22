import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArrayUtilsService {
  constructor() {}

  flat(arr: any[]): [] {
    return arr.reduce((acc, val) => acc.concat(val), []);
  }
}
