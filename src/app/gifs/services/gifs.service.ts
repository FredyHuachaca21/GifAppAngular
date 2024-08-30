import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY = 'Aj33zfCoFlIpUlGTKp3Q4tJw4D5wZE2J';
const GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs';

@Injectable({providedIn: 'root'})
export class GifsService {
  public gifList: Gif[] = [];

  private _history: string[] = [];

  constructor(private httpClient: HttpClient) {
    this.loadLocalStorage();
    console.log('se cargó el historial', this._history);

  }



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

    // Guarda el historial en el localStorage
    this.saveLocalStorage();

  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._history));
  }



  private loadLocalStorage(): void {

    // Verifica si existe el historial en el localStorage
    if (!localStorage.getItem('history')) return;
    // Carga el historial del localStorage
    this._history = JSON.parse(localStorage.getItem('history')!);
    // Valida que el historial no esté vacío
    if ( this._history.length === 0 ) return;
    // Carga el último tag del historial
    this.searchTag(this._history[0]);

  }


  searchTag(tag: string): void {

    // Valida que el tag no sea vacío
    if ( tag.length === 0 ) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', GIPHY_API_KEY)
      .set('q', tag)
      .set('limit', '10');

    console.log(this._history);

    this.httpClient.get<SearchResponse>(`${GIPHY_BASE_URL}/search`, {params})
    .subscribe((response) => {
      this.gifList = response.data;
      console.log('gifs',  this.gifList);
    });

  }

}
