import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {
  constructor() { }

  private _history: string[] = [];

  get tagsHistory() {
    return [...this._history];
  }

  searchTag(tag: string): void {
    this._history.unshift(tag);
    console.log(this._history);

  }

}
