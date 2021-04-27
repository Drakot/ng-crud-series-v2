import { Serie } from './../models/serie.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private httpClient: HttpClient) { }

  getSeries(filter: string): Observable<any> {
    const params = { filter: filter }
    return this.httpClient.get(`${environment.apiUrl}/series`, { params: params })
      .pipe(
        catchError(error => {
          return error;
        })
      );
  }

  saveSerie(serie: Serie): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/serie`, serie)
      .pipe(
        catchError(error => {
          return error;
        })
      );
  }

  getSerie(id: string |null): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/serie/${id}`).pipe(
      catchError(error => {
        return error;
      })
    );
  }

  //PUT
  updateSerie(serie: Serie): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/serie/${serie._id}`, serie).pipe(
      catchError(error => {
        return error;
      })
    );
  }

  //DELETE
  deleteSerie(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/serie/${id}`).pipe(
      catchError(error => {
        return error;
      })
    );
  }
}
