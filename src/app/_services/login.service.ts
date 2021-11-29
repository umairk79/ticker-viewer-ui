import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tickets } from '../_model/tickets';
import { environment } from 'src/environments/environment';

/**
 * Service class used to connect with the backend.
 * @param email, password, subdomain, page
 * @returns backend response data
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(email: any, password: any, subdomain: any, page: number): Observable<Tickets> {
    let body = { data: {email: email, password: password, subdomain: subdomain, page: page}};
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
