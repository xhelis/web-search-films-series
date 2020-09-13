import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable()
export class OmdbapiServices {
  constructor(private http: HttpClient) {}

  getDataList(wordSearh: string): Observable<any> {
    return this.http.get(environment.dataFilmOrSerie + 's=' + wordSearh);
  }

  getFilmOrSerieFavourite(filmOrSerie: string): Observable<any> {
    return this.http.get(environment.dataFilmOrSerie + 'i=' + filmOrSerie);
  }
}
