import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  constructor(
    private http: HttpClient
  ) { }

  get(url: string) {
    return this.http.get(url, this.getRequestOptions()).pipe(catchError(this.handleError));
  }

  private getRequestOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return httpOptions;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.message}`);
    }
    return throwError(error);
  }
}
