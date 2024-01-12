import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {

  private apiUrl = 'https://ipapi.co/json/';

  constructor(private http: HttpClient) { }

  findLocationByIP(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  storeUserStateInLocalStorage(state: string) {
    localStorage.setItem('userState', state);
  }
}
