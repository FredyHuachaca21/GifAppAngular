import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY = 'Aj33zfCoFlIpUlGTKp3Q4tJw4D5wZE2J';
const GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs';

@Injectable({providedIn: 'root'})
export class GifsService {
  public gifList: Gif[] = [];

  private _history: string[] = [];

  constructor(private httpClient: HttpClient) { }



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
