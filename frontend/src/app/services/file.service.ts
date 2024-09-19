import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { File } from '../models/file.model';

const baseUrl = 'http://localhost:8080/api/files';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<File[]> {
    return this.http.get<File[]>(baseUrl);
  }

  get(id: any): Observable<File> {
    return this.http.get<File>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<File[]> {
    return this.http.get<File[]>(`${baseUrl}?title=${title}`);
  }
}
