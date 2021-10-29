import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:9002";
  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(this.url + '/user/login', data);
  }

  signup(data: any) {
    return this.http.post(this.url + '/user/', data);
  }

  getNotes(email: string) {
    console.log("email::::", email);
    return this.http.post(this.url + '/user/notes', email);
  }

  addNote(data: any) {
    return this.http.post(this.url + '/user/note', data);
  }
}
