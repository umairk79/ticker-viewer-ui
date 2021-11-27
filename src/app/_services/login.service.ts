import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tickets } from '../_model/tickets';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(email: any, password: any, subdomain: any): Observable<Tickets> {
    let body = { data: {email: email, password: password, subdomain: subdomain }};
    let bodyString = JSON.stringify(body); 
    let url = environment.backendURL + environment.backendEndpoint;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<Tickets>(url, bodyString, httpOptions);
  }
}
