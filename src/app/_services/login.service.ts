import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(email: any, password: any, subdomain: any): Observable<any[]> {
    let body = { data: {email: email, password: password, subdomain: subdomain }};
    let bodyString = JSON.stringify(body); // Stringify payload
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any[]>('http://127.0.0.1:8003/connect/', bodyString, httpOptions);
  }
}
