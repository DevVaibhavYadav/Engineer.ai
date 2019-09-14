import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Headers, RequestOptions, ResponseContentType } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  endpoint = 'https://hn.algolia.com/api/v1/search_by_date?tags=story';
  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getData(): Observable<any> {
    return this.http.get(this.endpoint).pipe(
      map(this.extractData));
  }
}
