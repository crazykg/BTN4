import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams, HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Config } from '../config';

const config_responseType = {
  'blob': 'blob',
  'arraybuffer': 'arraybuffer',
  'json': 'json',
  'text': 'text',
  'none': ''
};
@Injectable()
export class API {
  private config = Config;

  constructor(
      private http: HttpClient, 
      public router: Router) { }

  getToken() {
    let accessToken = localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token') || '';
    if (accessToken !== '') {
      return `Bearer ${accessToken}`;
    } else {
      return '';
    } 
  }

  /**
   * REQUEST return http body
   * @param method
   * @param url
   * @param data
   */
  request(method, url, data = null) {
    const req = new HttpRequest(method, this.config.API_URL + url, data, this.getRequestOptions());
    return this.http.request(req).pipe(catchError(this.handleError));
  }

  /**
   * REQUEST POST multipart
   * @param url
   * @param data
   */
  requestPostMultiPart(url, data: FormData) {
    const req = new HttpRequest('POST', this.config.API_URL + url, data, this.getRequestOptionNoContentType());
    return this.http.request(req).pipe(catchError(this.handleError));
  }

  /**
   * REQUEST PUT multipart
   * @param url
   * @param data
   */
  requestPutMultiPart(url, data: FormData) {
    const req = new HttpRequest('PUT', this.config.API_URL + url, data, this.getRequestOptionNoContentType());
    return this.http.request(req).pipe(catchError(this.handleError));
  }

  /**
   * REQUEST download with header
   * @param url 
   */
  requestDownload(url) {
    const req = new HttpRequest('GET', this.config.API_URL + url, null, this.getDownloadOptions());
    return this.http.request(req).pipe(catchError(this.handleError));
  }

  /**
   * Get method
   * @param url
   */
  get(url) {
    return this.http.get(this.config.API_URL + url, this.getRequestOptions()).pipe(catchError(this.handleError));
  }

  /**
   * Post method
   * @param url
   * @param data
   */
  post(url, data) {
    data = JSON.stringify(data);
    return this.http.post(this.config.API_URL + url, data, this.getRequestOptions()).pipe(catchError(this.handleError));
  }

  /**
   * POST multipath
   * @param url
   * @param data
   */
  postMultiPart(url, data: FormData) {
    return this.http
      .post(this.config.API_URL + url, data, this.getRequestOptionBlobNoContentType())
      .pipe(catchError(this.handleError));
  }

  /**
   * POST multipath
   * @param url
   * @param data
   */
  postMultiPartJSON(url, data: FormData) {
    return this.http
      .post(this.config.API_URL + url, data, this.getRequestOptionNoContentType())
      .pipe(catchError(this.handleError));
  }

  /**
   * Put method
   * @param url
   * @param data
   */
  put(url, data) {
    data = JSON.stringify(data);
    return this.http.put(this.config.API_URL + url, data, this.getRequestOptions()).pipe(catchError(this.handleError));
  }

  /**
   * Patch Method
   * @param url 
   * @param data 
   */
  patch(url, data) {
    data = JSON.stringify(data);
    return this.http.patch(this.config.API_URL + url, data, this.getRequestOptions()).pipe(catchError(this.handleError));
  }

  /**
   * PUT multipart
   * @param url
   * @param data
   */
  putMultiPart(url, data: FormData) {
    return this.http
      .put(this.config.API_URL + url, data, this.getRequestOptionNoContentType())
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete method
   * @param url
   */
  delete(url) {
    return this.http.delete(this.config.API_URL + url, this.getRequestOptions()).pipe(catchError(this.handleError));
  }

  /**
   * Download file
   * @param url
   */
  download(url) {
    return this.http.get(this.config.API_URL + url, this.getDownloadOptions()).pipe(catchError(this.handleError));
  }

  downloadOnlyURL(url) {
    return this.http.get(url, {responseType: "arraybuffer"}).pipe(catchError(this.handleError));
  }

  /**
   * POST download
   * @param url
   * @param data
   */
  postDownload(url, data) {
    return this.http
      .post(this.config.API_URL + url, data, this.getRequestOptionBlobNoContentType())
      .pipe(catchError(this.handleError));
  }

  /**
   * Upload File
   * @param url
   * @param file
   */
  uploadFile(url: string, file: FormData) {
    const req = new HttpRequest('POST', this.config.API_URL + url, file, this.getOptionsProcess());
    return this.http.request(req);
  }

  getOptionsProcess() {
    var token = this.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      }),
      reportProgress: true
      // observe: 'events'
    };

    return httpOptions;
  }

  /**
   * Make request option no content-type for Blob
   */
  getRequestOptionBlobNoContentType() {
    var token = this.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      }),
      responseType: 'blob' as 'blob'
    };

    return httpOptions;
  }

  /**
   * Make request option no content-type
   */
  getRequestOptionNoContentType() {
    var token = this.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return httpOptions;
  }

  /**
   * Make request options
   */
  getRequestOptions() {
    var token = this.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };

    return httpOptions;
  }

  /**
   * Http options for download and preview
   */
  getDownloadOptions() {
    var token = this.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache'
      }),
      responseType: 'blob' as 'blob'
    };

    return httpOptions;
  }

  /**
   * Handle Error
   * @param error
   */
  private handleError(error: HttpErrorResponse) {
    // if (error.status === 401) {
    //   localStorage.removeItem('token');
    //   localStorage.removeItem('partyId');
    //   localStorage.removeItem('username');
    //   sessionStorage.clear();
    //   this.router.navigate(['/login']);
    // }

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
    // 'Something bad happened; please try again later.');
  }
}