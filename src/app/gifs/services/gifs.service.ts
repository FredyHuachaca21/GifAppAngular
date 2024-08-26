import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {
  constructor() { }

  private _history: string[] = [];

  get tagsHistory() {
    return [...this._history];
  }

  private organizeHistory(tag: string): void {

    // Pasar el tag a minúsculas
    tag = tag.toLowerCase();

    // Verifica si el tag ya existe en el historial
    if ( this._history.includes(tag) ) {
      // Si el tag ya existe, lo elimina del historial
      this._history = this._history.filter((oldTag) => oldTag !== tag);
    }

    // Inserta nuevos tags al inicio del array y devuelve el array actualizado
    this._history.unshift(tag);

    // Limita el historial a 10 elementos
    this._history = this._history.splice(0, 10);
  }


  searchTag(tag: string): void {

    // Valida que el tag no sea vacío
    if ( tag.length === 0 ) return;
    this.organizeHistory(tag);

    console.log(this._history);

  }

}
