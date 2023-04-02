import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  setItem(key: string, value: string) {
    return of(localStorage.setItem(key, value));
  }

  getItem(key: string) {
    return of(localStorage.getItem(key));
  }
  delete = (key: string) => {
    localStorage.removeItem(key);
  };

  getUserData(key: string) {
    return localStorage.getItem(key);
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }
  getTokenFromSessionStorage() {
    return sessionStorage.getItem('token');
  }

  clearStorage() {
    return of(localStorage.clear());
  }
  clearSessionStorage() {
    return of(sessionStorage.clear());
  }
}
