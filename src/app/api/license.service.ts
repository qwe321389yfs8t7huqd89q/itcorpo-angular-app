import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { apiURL } from './config';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(`${apiURL}/license`, {
      observe: "response",
      responseType: 'text',
      headers: {
        'Content-Type': 'text/plain'
      },
    }).pipe(
      map(res => res.body)
    )
  }
}
